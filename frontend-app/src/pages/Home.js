import React, { useEffect, useState } from 'react'
import { Form, Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import {services} from "../utils/Data";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice'
import { getAllProducts } from '../features/products/productSlice';


const Home = () => {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();
    const getBlogs = () => {
        dispatch(getAllBlogs())
    }
    const getProducts = () => {
      dispatch(getAllProducts())
  }
    useEffect(()=>{
        getBlogs();
        getProducts();
    },[]);
    const blogState = useSelector(state => state?.blog?.blog);
    const productState = useSelector(state => state?.product?.product);
  return (
    <>
    <Container class1="home-wrapper-1 py-5">
          <div className='row'>
            <div className='col-6'>
              <div className='main-banner position-relative'>
                <img className='img-fluid rounded-3' src="images/main-banner-1.jpg" alt="main-banner" />
                <div className='main-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 or $41.62/mo.</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='d-flex gap-10 flex-wrap justify-content-between align-items-center'>
                <div className='small-banner position-relative'>
                  <img className='img-fluid rounded-3' src="images/catbanner-01.jpg" alt="main-banner" />
                  <div className='small-banner-content position-absolute'>
                    <h4>Best Sake</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>
                <div className='small-banner position-relative'>
                  <img className='img-fluid rounded-3' src="images/catbanner-02.jpg" alt="main-banner" />
                  <div className='small-banner-content position-absolute'>
                    <h4>NEW ARRIVAL</h4>
                    <h5>Put IPad Air</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>
                <div className='small-banner position-relative'>
                  <img className='img-fluid rounded-3' src="images/catbanner-03.jpg" alt="main-banner" />
                  <div className='small-banner-content position-absolute'>
                    <h4>SUPERCHARGED FOR PROS.</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>
                <div className='small-banner position-relative '>
                  <img className='img-fluid rounded-3' src="images/catbanner-04.jpg" alt="main-banner" />
                  <div className='small-banner-content position-absolute'>
                    <h4>SUPERCHARGED FOR PROS.</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>From $999.00 <br /> or $41.62/mo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Container>
    <Container class1="home-wrapper-2 py-5">
          <div className='row'>
            <div className='col-12'>
              <div className='servies d-flex align-items-center justify-content-between'>
                {
                  services?.map((i,j)=>{
                    return(
                      <div className='d-flex align-items-center gap-15' key={j}>
                        <img src={i.image} alt="services" />
                        <div>
                          <h6>{i.title}</h6>
                          <p className="mb-0">{i.tagline}</p>
                        </div>
                      </div>
                    )
                  })
                }
                {/* <div className='d-flex align-items-center gap-15'>
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders over $100</p>
                  </div>
                </div> */}
                

              </div>
            </div>
          </div>
    </Container>
    <Container class1="home-wrapper-2 py-5">
          <div className='row'>
            <div className='col-12'>
              <div className='categories d-flex justify-content-between align-items-center flex-wrap'>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Headphones</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Headphones</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
              </div>
            </div>
          </div>
    </Container>
    <Container class1="featured-wrapper py-5 home-wrapper-2">
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Featured Collection</h3>
            </div>
            {
              productState && productState?.map((item, index) => {
                if(item.tags === "featured "){
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
    </Container>
    <Container class1="famous-wrapper py-5 home-wrapper-2">
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Famous Products</h3>
            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img className='img-fluid' src='images/tab2.jpg' alt='famous' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.62/mo for 24 mo.</p>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img className='img-fluid' src='images/tab3.jpg' alt='famous' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.62/mo for 24 mo.</p>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img className='img-fluid' src='images/tab1.jpg' alt='famous' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.62/mo for 24 mo.</p>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='famous-card position-relative'>
                <img className='img-fluid' src='images/tab.jpg' alt='famous' />
                <div className='famous-content position-absolute'>
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.62/mo for 24 mo.</p>
                </div>
              </div>
            </div>
          </div>
    </Container>
    <Container class1="special-wrapper py-5 home-wrapper-2">
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Special Products</h3>
            </div>
          </div>
          <div className='row'>
          {
              productState && productState?.map((item,index) => {
                
                if(item.tags === "special"){
                  return (
                      <SpecialProduct key={index} 
                        _id={item?._id}
                        title={item?.title}
                        brand={item?.brand}
                        price={item?.price}
                        totalrating={item?.totalrating.toString()}
                        quantity={item?.quantity}
                        sold={item?.sold}
                      />
                  )
                }
                
              })
            }
            
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
      <Container class1='marque-wrapper py-5'>
          <div className='row'>
            <div className='col-12'>
              <div className='marquee-inner-wrapper card-wrapper'>
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-01.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-02.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-03.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-04.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-05.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-06.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-07.png' alt='brand' />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-08.png' alt='brand' />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
      </Container>
      <Container class1='blog-wrapper py-5 home-wrapper-2'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Our Lastest Blogs</h3>
            </div>
            <div className='row'>
            {
              blogState?.map((item,index) => {
                if(index < 4){
                  return (
                    <div key={index} className='col-3'>
                      <BlogCard 
                        id={item?._id}
                        title={item?.title}
                        image={item?.images[0]?.url}
                        description={item?.description}
                        date={moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                      />
                    </div>
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

export default Home