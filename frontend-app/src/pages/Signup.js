import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomerInput from '../components/CustomerInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../features/user/userSlice'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const signUpSchema = yup.object({
  firstname: yup.string().required('First Name is Required'),
  lastname: yup.string().required('Last Name is Required'),
  email: yup.string().email("Email Should be valid").required('Email is Required'),
  mobile: yup.string().required('Mobile is Required'),
  password: yup.string().required("Password is Required")
});

const Signup = () => {
  const authState = useSelector(state => state?.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(registerUser(values));
    },
  });
  useEffect(()=>{
    if(authState?.createdUser!== null && authState?.isError === false){
      navigate('/login')
    }
  },[authState])
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1='login-wrapper home-wrapper-2 py-5'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3 '>Sign Up</h3>
                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>
                  <CustomerInput 
                    type="text" 
                    name="firstname"
                    placeholder='First Name' 
                    value={formik.values.firstname}
                    onChange={formik.handleChange('firstname')}
                    onBlur={formik.handleBlur('firstname')}
                  />
                  <div className='error'>
                    {
                      formik.touched.firstname && formik.errors.firstname
                    }
                  </div>
                  <CustomerInput 
                    type="text" 
                    name="lastname"
                    placeholder='Last name' 
                    value={formik.values.lastname}
                    onChange={formik.handleChange('lastname')}
                    onBlur={formik.handleBlur('lastname')}
                  />
                  <div className='error'>
                    {
                      formik.touched.lastname && formik.errors.lastname
                    }
                  </div>
                  <CustomerInput 
                    type="email" 
                    name="email"
                    placeholder='Email' 
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                  />
                  <div className='error'>
                    {
                      formik.touched.email && formik.errors.email
                    }
                  </div>
                  <CustomerInput 
                    type="tel" 
                    name="mobile"
                    placeholder='Mobile' 
                    value={formik.values.mobile}
                    onChange={formik.handleChange('mobile')}
                    onBlur={formik.handleBlur('mobile')}
                  />
                  <div className='error'>
                    {
                      formik.touched.mobile && formik.errors.mobile
                    }
                  </div>
                  <CustomerInput 
                    type="password" 
                    name="password"
                    placeholder='Password' 
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                  />
                  <div className='error'>
                    {
                      formik.touched.password && formik.errors.password
                    }
                  </div>
                  
                  <div>
                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                      <button type='submit' className='button border-0'>Sign Up</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </Container>
    </>
  )
}

export default Signup