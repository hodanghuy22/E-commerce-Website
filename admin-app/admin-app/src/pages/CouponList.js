import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteACoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount.length - b.discount.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getCoupons())
  },[]);
  const couponState = useSelector((state)=>state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i+1,
      name: couponState[i].name,
      expiry: couponState[i].expiry,
      discount: couponState[i].discount,
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/coupon/${couponState[i]._id}`}><BiEdit /></Link>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
        onClick={()=>showModal(couponState[i]._id)}><AiFillDelete /></button>
      </>)
    });
  }
  const deleteCoupon = (e) =>{
    dispatch(deleteACoupon(e))
    setOpen(false);
    setTimeout(()=>{
      dispatch(getCoupons())
    },100)
  }
    return (
        <div>
          <h3 className='mb-4 title'>Coupons List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModal 
            title="Are you sure you want to delete this coupon?" 
            hideModal={hideModal}
            open={open}
            performAction={()=>{deleteCoupon(couponId)}}
          />
        </div>
      )
}

export default CouponList