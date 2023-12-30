import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
import {Link} from 'react-router-dom'
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getBrands())
  },[]);
  const brandState = useSelector((state)=>state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i+1,
      title: brandState[i].title,
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/brand/${brandState[i]._id}`}><BiEdit /></Link>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
        onClick={()=>showModal(brandState[i]._id)}><AiFillDelete /></button>
      </>)
    });
  }
  const deleteBrand = (e) =>{
    dispatch(deleteABrand(e))
    setOpen(false);
    setTimeout(()=>{
      dispatch(getBrands())
    },100)
  }
    return (
        <div>
          <h3 className='mb-4 title'>Brands List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModal 
            title="Are you sure you want to delete this brand?" 
            hideModal={hideModal}
            open={open}
            performAction={()=>{deleteBrand(brandId)}}
          />
        </div>
      )
}

export default Brandlist