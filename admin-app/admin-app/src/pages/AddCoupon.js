import { React, useEffect } from 'react'
import CustomerInput from '../components/CustomerInput'
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createCoupon, getACoupon, resetState, updateACoupon } from '../features/coupon/couponSlice';


let schema = yup.object().shape({
  name: yup.string().required('Coupon Name is Required'),
  expiry: yup.date().required('Expiry is Required'),
  discount: yup.number().required('Discount is Required'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()
  const getCouponId = location.pathname.split("/")[3]
  const newCoupon = useSelector(state => state.coupon);
  const {isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon} = newCoupon;
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const formattedMonth = month.padStart(2, '0');
    return [year, formattedMonth, day].join("-");
  };
  console.log(changeDateFormat(couponExpiry))
  useEffect(()=>{
    if(getCouponId !== undefined){
      dispatch(getACoupon(getCouponId))
    }else{
      dispatch(resetState())
    }
  },[getCouponId])
  useEffect(()=>{
    if(isSuccess && createdCoupon){
      toast.success('Coupon Added Succesfully!');
    }
    if(isSuccess && updatedCoupon ){
      toast.success('Coupon Updated Succesfully!');
      navigate('/admin/coupon-list')
    }
    if(isError ){
      toast.error('Something went wrong!');
    }
  },[isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || '',
      expiry: changeDateFormat(couponExpiry) || '',
      discount: couponDiscount || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getCouponId !== undefined){
        const data = { id:getCouponId, couponData: values}
        dispatch(updateACoupon(data))
        dispatch(resetState())
      }else{
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },300)
      }
    },
  });
  
  return (
    <div>
        <h3 className='mb-4 title'>{getCouponId!==undefined?"Edit":"Add"} Coupon</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomerInput 
                name="name" 
                onChange={formik.handleChange('name')} 
                onBlur={formik.handleBlur('name')} 
                val={formik.values.name}
                type='text' 
                label="Enter Coupon name" 
              />
              <div className='error'>
                {
                  formik.touched.name && formik.errors.name
                }
              </div>
              <CustomerInput 
                type='date'
                name="expiry"
                onChange={formik.handleChange("expiry")}
                onBlur={formik.handleBlur("expiry")}
                val={formik.values.expiry}
                label="Enter Expiry Data"
              />
              <div className='error'>
                {
                  formik.touched.expiry && formik.errors.expiry
                }
              </div>
              <CustomerInput 
                name="discount" 
                onChange={formik.handleChange('discount')} 
                onBlur={formik.handleBlur('discount')} 
                val={formik.values.discount}
                type='number' 
                label="Enter discount" 
              />
              <div className='error'>
                {
                  formik.touched.discount && formik.errors.discount
                }
              </div>
              <button type="submit" className='btn btn-success border-0 rounded-3 my-5'>
              {getCouponId!==undefined?"Edit":"Add"} Coupon
              </button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon