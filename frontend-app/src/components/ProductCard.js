import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import tab from "../images/tab.jpg";
import tab1 from "../images/tab1.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';


const ProductCard = (props) => {
    const { grid, images, totalrating, description, price, brand, title, _id } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const addToWish = (id) => {
        dispatch(addToWishlist(id));
    }
    return (
        <>
            <div className={` ${location.pathname === "/store" ? `gr-${grid}` : "col-3"} `}>
                <div className='product-card position-relative'>
                    <div className='wish-list-icon position-absolute'>
                        <button onClick={(e) => { addToWish(_id) }} className='border-0 bg-transparent'>
                            <img src={wish} alt='wishlist' />
                        </button>
                    </div>
                    <div className='product-images'>
                        <img className='img-fluid mx-auto' width={160} src={images?images[0].url:'images/blog-1.jpg'} alt='product-images' />
                        <img className='img-fluid mx-auto' width={160} src={images?images[1].url:'images/blog-1.jpg'} />
                    </div>
                    <div className='product-details'>
                        <h6 className='brand'>{brand}</h6>
                        <h5 className='product-title'>
                            {title}
                        </h5>
                        <ReactStars
                            count={5}
                            size={24}
                            value={totalrating}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}                  dangerouslySetInnerHTML= 
                            {{ __html: description.substr(0,70), }}>

                        </p>
                        <p className='price'>${price}</p>
                    </div>
                    <div className='action-bar position-absolute gap-15'>
                        <div className='d-flex flex-column'>
                            <button className='border-0 bg-transparent'>
                                <img src={prodcompare} alt='compare' />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img onClick={()=> {
                                    setTimeout(() => {
                                        navigate("/product/"+_id) 
                                    }, 300);
                                }} src={view} alt='view' />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={addcart} alt='addcart' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductCard