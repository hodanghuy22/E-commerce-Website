import {React, useEffect, useState} from 'react'
import CustomerInput from '../components/CustomerInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { createBlog, getABlog, resetState, updateABlog } from '../features/blogs/blogSlice';
import { getBlogCategories } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
  title: yup.string().required('Tilte is Required'),
  description: yup.string().required('Description is Required'),
  category: yup.string().required('Category is Required'),
});


const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const getBlogId = location.pathname.split("/")[3]
  const imgState = useSelector(state => state.upload.images);
  const bCatState = useSelector(state => state.bCategory.bcategories);
  const newBlog = useSelector(state => state.blog);
  const {isSuccess, isError, isLoading, createdBlog, blogName, blogDesc, blogCategory, blogImages, updatedBlog} = newBlog;
  useEffect(()=>{
    if(getBlogId !== undefined){
      dispatch(getABlog(getBlogId))
      img.push(blogImages)
    }else{
      dispatch(resetState())
    }
  },[getBlogId])

  useEffect(()=>{
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);

  useEffect(()=>{
    if(isSuccess && createdBlog){
      toast.success('Blog Added Succesfully!');
    }
    if(isSuccess && updatedBlog ){
      toast.success('Blog Updated Succesfully!');
      navigate('/admin/blog-list')
    }
    if(isError){
      toast.error('Something went wrong!');
    }
  },[isSuccess, isError, isLoading])



  const img = [];
  imgState.forEach(i=>{
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  })

  useEffect(()=>{
    formik.values.images = img;
  },[blogImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || '',
      description: blogDesc || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if(getBlogId !== undefined){
        const data = { id:getBlogId, blogData: values}
        dispatch(updateABlog(data))
        dispatch(resetState())
      }else{
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(()=>{
          dispatch(resetState())
        },300)
      }
    },
  });

    
  return (
    <div>
        <h3 className='mb-4 title'>{getBlogId!==undefined?"Edit":"Add"} Blog</h3>
        <div className=''>
            <form onSubmit={formik.handleSubmit}>
                
                <div className='mt-4'>
                  <CustomerInput 
                    name="title" 
                    onChange={formik.handleChange('title')} 
                    onBlur={formik.handleBlur('title')} 
                    val={formik.values.title}
                    type='text' 
                    label="Enter Blog Title" 
                  />
                </div>
                <div className='error'>
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <select name="category" 
                  value={formik.values.category}
                  onChange={formik.handleChange('category')} 
                  onBlur={formik.handleBlur('category')}  className='form-control py-3 mt-3'>
                    <option value="">Select Blog Category</option>
                    {
                      bCatState.map((i,j) => {
                        return <option key={j} value={i.title}>{i.title}</option>
                      })
                    }
                </select>
                <div className='error'>
                  {
                    formik.touched.category && formik.errors.category
                  }
                </div>
                <ReactQuill 
                    theme="snow" className='mt-3'
                    name="description" 
                    value={formik.values.description}
                    onChange={formik.handleChange('description')}                    
                />
                <div className='error'>
                  {
                    formik.touched.description && formik.errors.description
                  }
                </div>
                <div className='bg-white border-1 p-5 text-center mt-3'>
                  <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles)) }>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div className='showImages mt-3 d-flex flex-wrap gap-3'>
                  {imgState?.map((i,j)=>{
                    return (
                      <div className='position-relative' key={j}>
                        <button type="button" onClick={()=>dispatch(deleteImg(i.public_id))} className='btn-close position-absolute' style={{ top:"10px", right:"10px" }}></button>
                        <img src={i.url} alt="" width={200} height={200} />
                      </div>
                    )
                  })}
                </div>
                <button type="submit" className='btn btn-success border-0 rounded-3 my-5'>{getBlogId!==undefined?"Edit":"Add"} Blog</button>
            </form>
        </div>
    </div>
  )
}

export default Addblog