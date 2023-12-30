import { React, useEffect } from 'react'
import CustomerInput from '../components/CustomerInput'
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createBrand, getABrand, resetState, updateABrand } from '../features/brand/brandSlice';


let schema = yup.object().shape({
  title: yup.string().required('Brand Name is Required'),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3]
  const newBrand = useSelector(state => state.brand);
  const {isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand} = newBrand;
  useEffect(()=>{
    if(getBrandId !== undefined){
      dispatch(getABrand(getBrandId))
    }else{
      dispatch(resetState())
    }
  },[getBrandId])
  
  useEffect(()=>{
    if(isSuccess && createdBrand){
      toast.success('Brand Added Succesfully!');
    }
    if(isSuccess && updatedBrand ){
      toast.success('Brand Updated Succesfully!');
      navigate('/admin/brand-list')
    }
    if(isError){
      toast.error('Something went wrong!');
    }
  },[isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getBrandId !== undefined){
        const data = { id:getBrandId, brandData: values}
        dispatch(updateABrand(data))
        dispatch(resetState())
      }else{
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },300)
      }
    },
  });
  
  return (
    <div>
        <h3 className='mb-4 title'>{getBrandId!==undefined?"Edit":"Add"} Brand</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomerInput 
                name="title" 
                onChange={formik.handleChange('title')} 
                onBlur={formik.handleBlur('title')} 
                val={formik.values.title}
                type='text' 
                label="Enter Brand Title" 
              />
              <div className='error'>
                {
                  formik.touched.title && formik.errors.title
                }
              </div>
              <button type="submit" className='btn btn-success border-0 rounded-3 my-5'>
                {getBrandId!==undefined?"Edit":"Add"} Brand
              </button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand