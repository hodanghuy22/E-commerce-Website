import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import CustomerInput from '../components/CustomerInput'
import Container from '../components/Container'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice'

const emailSchema = yup.object({
  email: yup.string().email("Email Should be valid").required('Email is Required'),
});


const ForgotPassword = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: emailSchema,
        onSubmit: values => {
          dispatch(forgotPasswordToken(values))
        },
    });
  return (
    <>
      <Meta title={"ForgotPassword"} />
      <BreadCrumb title="ForgotPassword" />
      <Container class1='login-wrapper home-wrapper-2 py-5'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3 '>Reset Your Password</h3>
                <p className='text-center mt-2 mb-3'>We will send you an email to reset your password</p>
                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>
                  <CustomerInput type="email" 
                      placeholder='Email' 
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                  />
                  <div className='error'>
                    {
                        formik.touched.email && formik.errors.email
                    }
                  </div>
                  <div>
                    <div className='mt-3 d-flex justify-content-center gap-15 flex-column align-items-center'>
                      <button className='button border-0' type="submit">Submit</button>
                      <Link to="/login">Canel</Link>
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

export default ForgotPassword