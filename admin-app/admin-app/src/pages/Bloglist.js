import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteABlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];


const Bloglist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getBlogs());
  },[]);
  const blogState = useSelector(state => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i+1,
      title: blogState[i].title,
      description: blogState[i].description,
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/blog-add/${blogState[i]._id}`}><BiEdit /></Link>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
        onClick={()=>showModal(blogState[i]._id)}><AiFillDelete /></button>
      </>)
    });
  }
  const deleteBlog = (e) =>{
    dispatch(deleteABlog(e))
    setOpen(false);
    setTimeout(()=>{
      dispatch(getBlogs())
    },100)
  }
    return (
        <div>
          <h3 className='mb-4 title'>Blogs List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModal 
            title="Are you sure you want to delete this blog?" 
            hideModal={hideModal}
            open={open}
            performAction={()=>{deleteBlog(blogId)}}
          />
        </div>
      )
}

export default Bloglist