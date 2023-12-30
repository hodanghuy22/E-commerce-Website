import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
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


const Colorlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getColors());
  },[])
  const colorState = useSelector(state => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i+1,
      title: colorState[i].title,
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/color/${colorState[i]._id}`}><BiEdit /></Link>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
        onClick={()=>showModal(colorState[i]._id)}><AiFillDelete /></button>
      </>)
    });
  }
  const deleteColor = (e) =>{
    dispatch(deleteAColor(e))
    setOpen(false);
    setTimeout(()=>{
      dispatch(getColors())
    },100)
  }
    return (
        <div>
          <h3 className='mb-4 title'>Colors List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModal 
            title="Are you sure you want to delete this color?" 
            hideModal={hideModal}
            open={open}
            performAction={()=>{deleteColor(colorId)}}
          />
        </div>
      )
}

export default Colorlist