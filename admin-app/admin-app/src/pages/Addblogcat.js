import { React, useEffect } from 'react'
import CustomerInput from '../components/CustomerInput'
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createCategory, getABlogCategory, resetState, updateABlogCategory } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Category Name is Required'),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3]
  const newCategory = useSelector(state => state.bCategory);
  const {isSuccess, isError, isLoading, createdCategory, bCategoryName, updatedCategory} = newCategory;
  useEffect(()=>{
    if(getBlogCatId !== undefined){
      dispatch(getABlogCategory(getBlogCatId))
    }else{
      dispatch(resetState())
    }
  },[getBlogCatId])
  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success('Category Added Succesfully!');
    }
    if(isSuccess && updatedCategory ){
      toast.success('Category Updated Succesfully!');
      navigate('/admin/blog-category-list')
    }
    if(isError){
      toast.error('Something went wrong!');
    }
  },[isSuccess, isError, isLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bCategoryName || '',
      
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getBlogCatId !== undefined){
        const data = { id:getBlogCatId, blogCategoryData: values}
        dispatch(updateABlogCategory(data))
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
        <h3 className='mb-4 title'>{getBlogCatId!==undefined?"Edit":"Add"}  Blog Category</h3>
        <div>
        <form onSubmit={formik.handleSubmit}>
              <CustomerInput 
                  name="title" 
                  onChange={formik.handleChange('title')} 
                  onBlur={formik.handleBlur('title')} 
                  val={formik.values.title}
                  type='text' 
                  label="Enter Blog Category" 
                />
                <div className='error'>
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
              <button type="submit" className='btn btn-success border-0 rounded-3 my-5'>
              {getBlogCatId!==undefined?"Edit":"Add"}  Blog Category
              </button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat