import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteABlogCategory, getBlogCategories, resetState } from '../features/bcategory/bcategorySlice';
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
    title: 'Action',
    dataIndex: 'action',
  },
];


const Blogcatlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bCatId, setbCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbCatId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getBlogCategories());
  },[]);
  const getBCategoryState = useSelector(state => state.bCategory.bcategories);
  const data1 = [];
  for (let i = 0; i < getBCategoryState.length; i++) {
    data1.push({
      key: i+1,
      title: getBCategoryState[i].title,
      action: (<>
        <Link className='fs-3 text-danger'to={`/admin/blog-category/${getBCategoryState[i]._id}`}><BiEdit /></Link>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
        onClick={()=>showModal(getBCategoryState[i]._id)}><AiFillDelete /></button>
      </>)
    });
  }
  const deleteBlogCategory = (e) =>{
    dispatch(deleteABlogCategory(e))
    setOpen(false);
    setTimeout(()=>{
      dispatch(getBlogCategories())
    },100)
  }
    return (
        <div>
          <h3 className='mb-4 title'>Blog Categories</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModal 
            title="Are you sure you want to delete this blog category?" 
            hideModal={hideModal}
            open={open}
            performAction={()=>{deleteBlogCategory(bCatId)}}
          />
        </div>
      )
}

export default Blogcatlist