import React, { useEffect,useState } from 'react'
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteACategory, getCategories, resetState } from '../features/pcategory/pcategorySlice';
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


const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getCategories())
  },[]);
  const categoryState = useSelector(state => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < categoryState.length; i++) {
    data1.push({
      key: i+1,
      title: categoryState[i].title,
      action: (<>
        <Link className='fs-3 text-danger' to={`/admin/category/${categoryState[i]._id}`}><BiEdit /></Link>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0' 
        onClick={()=>showModal(categoryState[i]._id)}><AiFillDelete /></button>
      </>)
    });
  }
  const deletePCatgory = (e) =>{
    dispatch(deleteACategory(e))
    setOpen(false);
    setTimeout(()=>{
      dispatch(getCategories())
    },100)
  }
    return (
        <div>
          <h3 className='mb-4 title'>Category List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
          <CustomModal 
            title="Are you sure you want to delete this Product Category?" 
            hideModal={hideModal}
            open={open}
            performAction={()=>{deletePCatgory(pCatId)}}
          />
        </div>
      )
}

export default Categorylist