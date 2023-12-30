import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import {AiFillHome, AiOutlineMail} from "react-icons/ai";
import {BiPhoneCall, BiInfoCircle} from "react-icons/bi";
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createAContact } from '../features/contact/contactSlice';
import { useDispatch } from 'react-redux';

const contactSchema = yup.object({
  email: yup.string().email("Email Should be valid").required('Email is Required'),
  name: yup.string().required("Name is Required"),
  mobile: yup.string().required('Mobile is Required'),
  comment: yup.string().required("Comment is Required")
});


const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
        email: '',
        name: '',
        mobile: '',
        comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createAContact(values));
    },
});
  return <>
    <Meta title={"Contact Us"} />
    <BreadCrumb title="Contact Us" />
    <Container class1='contact-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.5407315495!2d106.365563441763!3d10.75461813192994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686041651602!5m2!1svi!2s" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='col-12 mt-5'>
            <div className='contact-iiner-wrapper d-flex justify-content-between'>
              <div>
                <h3 className='contact-title mb-4'>Contact</h3>
                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type="text"
                      name="name"
                      className='form-control'
                      placeholder='name'
                      value={formik.values.name}
                      onChange={formik.handleChange('name')}
                      onBlur={formik.handleBlur('name')}
                    />
                  </div>
                  <div className='error'>
                    {
                      formik.touched.name && formik.errors.name
                    }
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      className='form-control'
                      placeholder='Email'
                      value={formik.values.email}
                      onChange={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                    />
                  </div>
                  <div className='error'>
                    {
                      formik.touched.email && formik.errors.email
                    }
                  </div>
                  <div>
                    <input
                      type="tel"
                      className='form-control'
                      name="mobile"
                      placeholder='mobile'
                      value={formik.values.mobile}
                      onChange={formik.handleChange('mobile')}
                      onBlur={formik.handleBlur('mobile')}
                    />
                  </div>
                  <div className='error'>
                    {
                      formik.touched.mobile && formik.errors.mobile
                    }
                  </div>
                  <div>
                    <textarea
                      name='comment'
                      className='w-100 form-control'
                      cols="30"
                      rows="3"
                      placeholder='Comments'
                      value={formik.values.comment}
                      onChange={formik.handleChange('comment')}
                      onBlur={formik.handleBlur('comment')}
                    ></textarea>
                  </div>
                  <div className='error'>
                    {
                      formik.touched.comment && formik.errors.comment
                    }
                  </div>
                  <div>
                    <button className='button border-0'>Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className='contact-title mb-4'>Get on touch with us</h3>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiFillHome className='fs-5' />
                      <address className='mb-0'>Hno: 277, Near village chopal, Mandaura</address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiPhoneCall className='fs-5' />
                      <a href='tel:+91 123456789'>+91 123456789</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineMail className='fs-5' />
                      <a href='mailto:sieucapvipro123@gmail.com'>sieucapvipro123@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiInfoCircle className='fs-5' />
                      <p className='mb-0'>Monday - Friday 10AM - 8PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Container>
  </>;
}

export default Contact