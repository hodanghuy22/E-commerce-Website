import React, { useState } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import {FiEdit} from 'react-icons/fi'

const ProfileSchema = yup.object({
    firstname: yup.string().required('Firstname is Required'),
    lastname: yup.string().required("Lastname is Required"),
    email: yup.string().email("Email Should be valid").required('Email is Required'),
    mobile: yup.string().required("Mobile is Required")
});


const Profile = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

 const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
    const [edit, setEdit] = useState(true);
    const dispatch = useDispatch()
    const userState = useSelector(state => state?.auth?.user)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: ProfileSchema,
        onSubmit: values => {
            dispatch(updateProfile({
              data:values,
              config2:config2
            }))
            setEdit(true)
        },
    });
  return (
    <>
        <BreadCrumb title="My Profile" />
        <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className='row'>
              <div className='col-12'>
                <div className='d-flex justify-content-between align-items-center'>
                  <h3 className='my-3'>Updated Profile</h3>
                  <FiEdit className='fs-3' onClick={()=>setEdit(false)} /> 
                  <img />
                </div>
              </div>
                <div className='col-12'>
                <form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <label htmlFor="aa" className="form-label">First Name</label>
    <input type="text" disabled={edit} className="form-control" id="aa" 
    name='firstname' 
    onChange={formik.handleChange('firstname')} 
    onBlur={formik.handleBlur('firstname')} 
    value={formik.values.firstname} />
  </div>
  <div className='error'>
    {formik.touched.firstname && formik.errors.firstname}
  </div>
  <div className="mb-3">
    <label htmlFor="aa1" className="form-label">Last Name</label>
    <input type="text" disabled={edit} className="form-control" id="aa1" 
    name='lastname'
    onChange={formik.handleChange('lastname')} 
    onBlur={formik.handleBlur('lastname')} 
    value={formik.values.lastname} />
  </div>
  <div className='error'>
    {formik.touched.lastname && formik.errors.lastname}
  </div>
  <div className="mb-3">
    <label htmlFor="v" className="form-label">Email</label>
    <input type="email" disabled={edit} className="form-control" id="v"
    name='email'
    onChange={formik.handleChange('email')} 
    onBlur={formik.handleBlur('email')} 
    value={formik.values.email} />
  </div>
  <div className='error'>
    {
        formik.touched.email && formik.errors.email
    }
    </div>
  <div className="mb-3">
    <label htmlFor="a" className="form-label">Mobile</label>
    <input type="tel" disabled={edit} className="form-control" id="a"
    name='mobile'
    onChange={formik.handleChange('mobile')} 
    onBlur={formik.handleBlur('mobile')} 
    value={formik.values.mobile} />
  </div>
  <div className='error'>
    {formik.touched.mobile && formik.errors.mobile}
  </div>
  {
    edit === false && <button type="submit" className="btn btn-primary">Save</button>
  }
  
</form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Profile