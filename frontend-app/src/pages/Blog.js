import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import BlogCard from '../components/BlogCard'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice'
import moment from 'moment'


const Blog = () => {
    const dispatch = useDispatch();
    const getBlogs = () => {
        dispatch(getAllBlogs())
    }
    useEffect(()=>{
        getBlogs();
    },[]);
    const blogState = useSelector(state => state?.blog?.blog);
    return (<>
        <Meta title={"Blogs"} />
        <BreadCrumb title="Blogs" />
        <Container class1='blog-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>
                                Find By Categories
                            </h3>
                            <div>
                                <ul className='ps-0'>
                                    <li>Watch</li>
                                    <li>TV</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {
                                blogState?.map((item,index) => {
                                    return (
                                        <div key={index} className='col-6 mb-3'>
                                <BlogCard 
                                    id={item?._id}
                                    title={item?.title}
                                    image={item?.images[0]?.url}
                                    description={item?.description}
                                    date={moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                                />
                            </div>
                                    )
                            
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </Container>
    </>);
}

export default Blog