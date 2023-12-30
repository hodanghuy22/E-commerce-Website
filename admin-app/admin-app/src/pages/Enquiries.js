import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';


const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enquiryId, setenquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenquiryId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState())
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector(state => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
          <select
            name=""
            defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
            className='form-control form-select'
            onChange={(e)=> setEnquiryStatus(e.target.value, enquiryState[i]._id)}
          >
            <option value="Submitted" selected>
              Submitted
            </option>
            <option value="Contacted" >
              Contacted
            </option>
            <option value="In Progress" >
              In Progress
            </option>
            <option value="Resolved" >
              Resolved
            </option>
          </select>
        </>
      ),
      action: (<>
        <Link className='fs-3 text-danger ms-3' to={`/admin/enquiries/${enquiryState[i]._id}`}><AiOutlineEye /></Link>
        <button className='fs-3 text-danger ms-3 text-danger bg-transparent border-0'
          onClick={() => showModal(enquiryState[i]._id)}><AiFillDelete /></button>
      </>)
    });
  }
  const setEnquiryStatus = (e,i) => {
    const data = {id: i, enquiryData: e};
    dispatch(updateAEnquiry(data));
  }
  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e))
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries())
    }, 100)
  }
  return (
    <div>
      <h3 className='mb-4 title'>Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure you want to delete this enquiry?"
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteEnquiry(enquiryId) }}
      />
    </div>
  )
}

export default Enquiries