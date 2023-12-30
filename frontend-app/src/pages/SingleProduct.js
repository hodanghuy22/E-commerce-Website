import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import {TbGitCompare} from "react-icons/tb"
import {BsCartCheckFill} from "react-icons/bs"
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProductToCart, getUserCart } from '../features/user/userSlice';


const SingleProduct = () => {   
    const [grid, setGrid] = useState(4);
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const getProductId = location.pathname.split('/')[2];
    const singleProductState = useSelector(state => state?.product?.singleProduct)
    const productState = useSelector(state => state?.product?.product);
    const cartState = useSelector(state => state?.auth?.cartProducts);
    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);
    const addRatingToProduct = () =>{
        if(star === null){
            toast.error("Please add star rating")
            return false 
        }else{
            if(comment === null){
                toast.error('Pleas write review about the product')
                return false   
            }else{       
                dispatch(addRating({
                    star:star, 
                    comment: comment, 
                    prodId: getProductId}))
                setTimeout(() => {
                    dispatch(getAProduct(getProductId))
                }, 300);

            }
        }      
        return false
    }
      
    useEffect(()=>{
        dispatch(getAProduct(getProductId))
        dispatch(getAllProducts())  
        dispatch(getUserCart())   
    },[]) 
    useEffect(()=>{
        for(let index=0; index < cartState?.length; index++){
            if(getProductId === cartState[index]?.productId?._id){
                setAlreadyAdded(true)   
            }
        }
    },[])
    const uploadCart = () => {
        if(color === null){
            toast.error("Please Choose Color")
            return false
        }else{
            dispatch(addProductToCart(
                {
                    productId: singleProductState &&singleProductState?._id,
                    quantity,
                    color, 
                    price: singleProductState &&singleProductState?.price
                }))
            navigate('/cart')
        }
    }
    
    const specifications = {
        width: 500, 
        height: 500, 
        zoomWidth: 500, 
        img: singleProductState &&singleProductState?.images[0]?.url
    };
    const [orderedProduct, setorderedProduct] = useState(true);
    const copyToClipboard = (text) => {
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
      }
    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title="Product Name" />
            <Container class1='main-product-wrapper py-5 home-wrapper-2'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='main-product-image'>
                                <div>
                                    <ReactImageZoom {...specifications} />
                                </div>
                                <div>
                                    <div className='other-product-images d-flex flex-wrap gap-15 '>
                                        {
                                            singleProductState && singleProductState?.images.map((item, index) => {
                                                return(
                                                    <div key={index}>
                                                        <img className='img-fluid' src={singleProductState && singleProductState?.images[index]?.url} alt=""/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>   
                                </div> 
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='main-product-details'>
                                <div className='border-bottom'>
                                    <h3 className='title'>{singleProductState && singleProductState?.title}</h3>
                                </div>
                                <div className='border-bottom py-3'>
                                    <p className='price'>$ {singleProductState && singleProductState?.price}</p>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={singleProductState &&singleProductState?.totalrating.toString()}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0 t-review'>( 2 Reviews )</p>
                                    </div>
                                    <a className='review-btn' href='#review'>Write a Review</a>
                                </div>
                                <div className=' py-3'>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Type: </h3> 
                                        <p className='product-data'>Watch</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Brand: </h3> 
                                        <p className='product-data'>{singleProductState &&singleProductState?.brand}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Category: </h3> 
                                        <p className='product-data'>{singleProductState &&singleProductState?.category}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Tags: </h3> 
                                        <p className='product-data'>{singleProductState &&singleProductState?.tags}</p>
                                    </div>
                                    {
                                        alreadyAdded === false && <>
                                            <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                                        <h3 className='product-heading'>Color: </h3> 
                                        <Color setColor={setColor} colorData={singleProductState &&singleProductState?.color} />
                                    </div>
                                        </>
                                    }
                                    <div className='d-flex align-items-center flex-row gap-15 mt-2 mb-3'>
                                        {
                                            alreadyAdded === false && <>
                                                <h3 className='product-heading'>Quantity: </h3> 
                                        <div className=''>
                                            <input className='form-control' type='number' name='quantity' min={1} max={10} style={{ width: "70px" }} 
                                            onChange={e => setQuantity(e.target.value)}
                                            value={quantity}
                                            />
                                        </div>
                                            </>
                                        }
                                        <div className='d-flex align-items-center gap-30'>
                                            <button type="submit" className='button border-0'
                                            onClick={() => {alreadyAdded?navigate('/cart'):uploadCart()}} name="cart"
                                            >{alreadyAdded?"Go To Cart":"Add to CART"}</button>
                                            <button className="button signup">Buy It Now</button>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center gap-15'>
                                        <div>
                                            <a href=''><TbGitCompare className='fs-5 me-2' /> Add to Compare</a>
                                        </div>
                                        <div>
                                        <a href=''><BsCartCheckFill className='fs-5 me-2' /> Add to WishList</a>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column gap-10 my-3'>
                                        <h3 className='product-heading'>Shipping & Returns: </h3> 
                                        <p className='product-data'>Free shipping available oder within <b> 5-10 business days</b></p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-3'>
                                        <h3 className='product-heading'>Product Link: </h3>
                                        <a href='javascript:void(0);'
                                         onClick={()=>{copyToClipboard(window.location.href)}}>
                                            Coppy Product Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Container>
            <Container class1='description-wrapper py-5 home-wrapper-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <h4>Description</h4>
                            <div className='bg-white p-3'>
                                <p className='bg-white p-3' 
                                dangerouslySetInnerHTML={{ __html: singleProductState && singleProductState?.description }}>
                                </p>
                            </div>
                        </div>
                    </div>
            </Container>
            <Container class1='reviews-wrapper  home-wrapper-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 id='review' >Reviews</h3>
                            <div className='review-inner-wrapper'>
                                <div className='review-head d-flex justify-content-between align-items-end'>
                                    <div>
                                        <h4 className='mb-2'>Customer Reviews</h4>
                                        <div className='d-flex gap-10 align-items-center'>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={3}
                                                edit={false}
                                                activeColor="#ffd700"
                                                
                                            />
                                            <p className='mb-0'>Bases on 2 Reviews</p>
                                        </div>
                                    </div>
                                    {
                                        orderedProduct && (
                                            <div>
                                                <a className='text-dark text-decoration-underline' href=''>Write a Review</a>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='review-form py-4'>
                                    <h4 className='mb-2'>Write a review</h4>
                                    
                                        <div>   
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={0}
                                                edit={true}
                                                activeColor="#ffd700"
                                                onChange={(e)=>{
                                                    setStar(e)
                                                }}
                                            />    
                                        </div>
                                        <div>   
                                            <textarea   
                                                name=''
                                                id=''
                                                className='w-100 form-control'
                                                cols="30"
                                                rows="3"
                                                placeholder='Comments'
                                                onChange={(e)=>{
                                                    setComment(e.target.value)
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className='d-flex justify-content-end mt-3'>
                                            <button onClick={addRatingToProduct} type='button' className='button border-0'>Submit Review</button>
                                        </div>
                                </div>
                                <div className='reviews mt-4'>
                                    {
                                        singleProductState && singleProductState?.ratings?.map((item,index)=>{
                                            return (
                                                <div key={index} className='review'>
                                        <div className='d-flex gap-10 align-items-center'>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={item?.star}
                                                edit={true}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <p className='mt-3'>
                                            {item?.comment}
                                        </p>
                                    </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
            </Container>
            <Container class1='popular-wrapper py-5 home-wrapper-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='section-heading'>Our Popular Products</h3>
                        </div>
                        <div className='row'>
                        {
                            productState && productState?.map((item, index) => {
                                if(item.tags === "popular"){
                                return (
                                    <ProductCard key={index} grid={grid}
                                    _id={item?._id}
                                    images={item?.images}
                                    totalrating={item?.totalrating.toString()}
                                    description={item?.description}
                                    price={item?.price}
                                    brand={item?.brand}
                                    title={item?.title}
                                    />
                                )
                                }
                            })
                        }
                        </div>
                    </div>
            </Container>
        </>
    )
}

export default SingleProduct