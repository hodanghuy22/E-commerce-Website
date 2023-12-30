import { React, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import { getAEnquiry, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';

const ViewEnquiry = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const getEnqId = location.pathname.split("/")[3]
    const dispatch = useDispatch();
    const enqState = useSelector((state) => state.enquiry)
    const {isSuccess, isError, isLoading, enqName, enqMobile, enqEmail, enqComment, enqStatus, updatedEnquiry} = enqState;
    useEffect(()=>{
        if(getEnqId !== undefined){
            dispatch(getAEnquiry(getEnqId))
        }else{
            dispatch(resetState())
        }
    },[getEnqId])

    const goBack = () => {
        navigate(-1)
    }
    const setEnquiryStatus = (e,i) => {
        const data = {id: i, enquiryData: e};
        dispatch(updateAEnquiry(data));
        setTimeout(()=>{
            dispatch(getAEnquiry(getEnqId))
        },100)
      }
  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mb-4 title'>View Enquiry</h3>
            <button className='bg-transparent fs-6 mb-0 d-flex align-items-center gap-1 border-0' onClick={goBack}><BiArrowBack className='fs-5' /> Go Back</button>
        </div>
        <div className='mt-5 bg-white d-flex flex-column gap-3 p-4 rounded-3'>
            <div className='d-flex align-items-center gap-3'>
                <h5 className='mb-0'>Name: </h5>
                <p className='mb-0'>{enqName}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h5 className='mb-0'>Mobile: </h5>
                <p className='mb-0'>
                    <a href={`tel:+91${enqMobile}`}>{enqMobile}</a>
                </p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h5 className='mb-0'>Email: </h5>
                <p className='mb-0'>
                    <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
                </p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h5 className='mb-0'>Comment: </h5>
                <p className='mb-0'>{enqComment}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h5 className='mb-0'>Status: </h5>
                <p className='mb-0'>{enqStatus}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h5 className='mb-0'>Change Status: </h5>
                <div>
                    <select
                        name=""
                        defaultValue={enqStatus?enqStatus:"Submitted"}
                        className='form-control form-select'
                        onChange={(e)=> setEnquiryStatus(e.target.value, getEnqId)}
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
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewEnquiry