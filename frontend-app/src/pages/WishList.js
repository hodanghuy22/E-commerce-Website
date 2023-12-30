import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';


const WishList = () => {
    const dispatch = useDispatch();
    const getWishlistFromDB = () => {
        dispatch(getUserProductWishlist())
    }
    useEffect(()=>{
        getWishlistFromDB();
    },[]);
    const wishlistState = useSelector(state => state?.auth?.wishlist?.wishlist);
    const removeFromWishlist = (id)=>{
        dispatch(addToWishlist(id))
        setTimeout(() => {
            dispatch(getUserProductWishlist());
        },300)
    }
  return (
    <>
        <Meta title={"WishList"} />
        <BreadCrumb title="WishList" />
        <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    {
                        wishlistState?.length === 0 && (
                            <div className='text-center fs-3'>
                                No Data
                            </div>
                        )
                    }
                    {
                        wishlistState?.map((item,index) => {
                            return (
                            <div key={index} className='col-3'>
                        <div className='wishlist-card  position-relative'>
                            <img onClick={(e) => {removeFromWishlist(item?._id)}} src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid' />
                            <div className='wishlist-card-image bg-white'>
                                <img className='img-fluid d-block mx-auto' width={160} src={item?.images[0].url} alt="watch"/>
                            </div>
                            <div className='py-3'>
                                    <h5 className='title'>
                                        { item?.title }
                                    </h5>
                                    <h6 className='price'>$ { item?.price }</h6>
                                </div>
                        </div>
                    </div>
                            )
                        })
                    }
                    
                    
                </div>
        </Container>
    </>
  )
}

export default WishList