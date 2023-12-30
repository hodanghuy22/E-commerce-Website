import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomerInput from '../components/CustomerInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice'
import { useEffect } from 'react'

const loginSchema = yup.object({
    email: yup.string().email("Email Should be valid").required('Email is Required'),
    password: yup.string().required("Password is Required")
});


const Login = () => {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(loginUser(values));
        },
    });
    useEffect(()=>{
        if(authState.user !== null && authState.isError === false){
            navigate('/')
        }
    },[authState])
    return (
        <>
            <Meta title={"Login"} />
            <BreadCrumb title="Login" />
            <Container class1='login-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3 '>Login</h3>
                            <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>
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
                                    <Link to="/forgot-password">Forgot Password</Link>
                                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        <button type="submit" className='button border-0'>Login</button>
                                        <Link to="/singup" className="button signup">SignUp</Link>
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

export default Login