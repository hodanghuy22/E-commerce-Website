import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import CustomerInput from '../components/CustomerInput'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {resetAPassword} from '../features/user/userSlice'

const passwordSchema = yup.object({
    password: yup.string().required('Email is Required'),
  });
  

const ResetPassword = () => {
    const location = useLocation()
    const getToken = location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: passwordSchema,
        onSubmit: values => {
            dispatch(resetAPassword({token:getToken, password: values.password}))
        },
    });
    return (
        <>
            <Meta title={"Reset Password"} />
            <BreadCrumb title="Reset Password" />
            <Container class1='login-wrapper home-wrapper-2 py-5'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='auth-card'>
                                <h3 className='text-center mb-3 '>Reset Password</h3>
                                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>
                                    <CustomerInput type="password" name="password"
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
                                            <button type='submit' className='button border-0'>Confirm</button>
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

export default ResetPassword