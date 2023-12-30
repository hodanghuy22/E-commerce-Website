import { React, useEffect } from 'react'
import CustomerInput from '../components/CustomerInput'
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createCategory, getAPCategory, resetState, updateAPCategory } from '../features/pcategory/pcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Category Name is Required'),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPCatId = location.pathname.split('/')[3]
  const newCategory = useSelector(state => state.pCategory);
  const {isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory} = newCategory;
  useEffect(()=>{
    if(getPCatId !== undefined){
      dispatch(getAPCategory(getPCatId))
    }else{
      dispatch(resetState())
    }
  },[getPCatId])
  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success('Product Category Added Succesfully!');
    }
    if(isSuccess && updatedCategory ){
      toast.success('Product Category Updated Succesfully!');
      navigate('/admin/category-list')
    }
    if(isError){
      toast.error('Something went wrong!');
    }
  },[isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
      
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getPCatId !== undefined){
        const data = { id:getPCatId, categoryData: values}
        dispatch(updateAPCategory(data))
        dispatch(resetState())
      }else{
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },300)
      }
    },
  });
  return (
    <div>
        <h3 className='mb-4 title'>{getPCatId!==undefined?"Edit":"Add"} Category</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
              <CustomerInput 
                  name="title" 
                  onChange={formik.handleChange('title')} 
                  onBlur={formik.handleBlur('title')} 
                  val={formik.values.title}
                  type='text' 
                  label="Enter Product Category" 
                />
                <div className='error'>
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
              <button type="submit" className='btn btn-success border-0 rounded-3 my-5'>
              {getPCatId!==undefined?"Edit":"Add"} Category
              </button>
            </form>
        </div>
    </div>
  )
}

export default AddCat