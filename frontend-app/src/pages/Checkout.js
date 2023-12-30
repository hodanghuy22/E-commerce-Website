import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import watch from "../images/watch.jpg"
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { config } from "../utils/axiosConfig";
import { createAnOrder, deleteUserCart, getUserCart } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const shippingSchema = yup.object({
    firstName: yup.string().required("Fist Name Is Required"),
    lastName: yup.string().required("Last Name Is Required"),
    address: yup.string().required("Address Is Required"),
    state: yup.string().required("State Is Required"),
    city: yup.string().required("City Is Required"),
    country: yup.string().required("Country Is Required"),
    pincode: yup.string().required("Pincode Is Required"),
    
});

const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartState = useSelector(state => state?.auth?.cartProducts)
    const authState = useSelector(state => state?.auth)
    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [cartProductState, setCartProductState] = useState([])
    console.log(shippingInfo);
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
    useEffect(()=>{
        dispatch(getUserCart(config2))
    },[])
    useEffect(()=>{
        let sum = 0;
        for(let index=0; index<cartState?.length;index++){
            sum += (Number(cartState[index]?.quantity) * cartState[index]?.price)
            setTotalAmount(sum)
        }
    },[cartState])
    useEffect(()=>{
        if(authState?.orderedProduct !== null && authState?.orderedProduct?.status === true){
            navigate('/my-orders')
        }
    },[authState])
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            pincode: "",
        },
        validationSchema: shippingSchema,
        onSubmit:  values => {
            setShippingInfo(values)
            localStorage.setItem("address",JSON.stringify(values))
            setTimeout(()=>{    
                checkOutHandler()
            },300)
        },
    });
    const loadScript = (src) => {
        return new Promise((resolve)=>{
            const script = document.createElement("script")
            script.src=src;
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    useEffect(()=>{
        let items=[]
        for(let index = 0; index<cartState?.length; index++){
            items.push({
                product:cartState[index].productId._id,
                quantity:cartState[index].quantity,
                color:cartState[index].color._id,
                price:cartState[index].price
            })
        }
        setCartProductState(items)
    },[])

    const checkOutHandler =  async() => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert("Razorpat SDK failed to Load")
            return;
        }
        const result = await axios.post('http://localhost:1234/api/user/order/checkout',{amount: totalAmount +5}, config)
        if(!result){
            alert("Something went wrong")
            return;
        }
        const {amount,id:order_id, currency} = result.data.order
        console.log(result);
        const options = {
            key: "rzp_test_JSLJw54Jplwvjm", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "HoDangHuy",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };
                console.log("data" , data);
                const result = await axios.post("http://localhost:1234/api/user/order/paymentVerification", data, config);
                
                        dispatch(createAnOrder({
                            totalPrice:totalAmount, 
                            totalPriceAfterDiscount: totalAmount,
                            orderItems:cartProductState,
                            paymentInfo:result.data, 
                            shippingInfo:JSON.parse(localStorage.getItem("address"))
                        }))
                dispatch(deleteUserCart(config2))
                localStorage.removeItem("address")
            },
            prefill: {
                name: "Ho Dang Huy",
                email: "hodanghuy@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Ho Dang Huy Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
  return (
    <>
        <Container class1='checkout-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-7'>
                        <div className='checkout-left-data'>
                            <h3 className='website-name'>Dev Corner</h3>
                            <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/cart">Cart</Link>
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item total active" aria-current="page">
                                        Information
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item total active">
                                        Shipping
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item total active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className='title total'>
                                Contact Infomation
                            </h4>
                            <p className='user-details total'>
                                Navdeep Dahiya (nonud012@gmail.com)
                            </p>
                            <h4 className='mb-3'>Shipping Address</h4>
                            <form onSubmit={formik.handleSubmit} className='d-flex gap-15 justify-content-between flex-wrap'>
                                <div className='w-100'>
                                    <select  id=''className='form-control form-select'
                                    name='country'
                                    onChange={formik.handleChange('country')}
                                    onBlur={formik.handleBlur('country')}
                                    value={formik.values.country}
                                    >
                                        <option value="" selected disabled>Select Country</option>
                                        <option value="VietName"  >VietNam</option>
                                    </select>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.country && formik.errors.country
                                        }
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input type='text' className='form-control' placeholder='First name'
                                    name='firstName'
                                    onChange={formik.handleChange('firstName')}
                                    onBlur={formik.handleBlur('firstName')}
                                    value={formik.values.firstName}
                                    ></input>
                                <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.firstName && formik.errors.firstName
                                        }
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input type='text' className='form-control' placeholder='Last name'
                                    name='lastName'
                                    onChange={formik.handleChange('lastName')}
                                    onBlur={formik.handleBlur('lastName')}
                                    value={formik.values.lastName}
                                    ></input>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.lastName && formik.errors.lastName
                                        }
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <input type='text' className='form-control' placeholder='Address'
                                    name='address'
                                    onChange={formik.handleChange('address')}
                                    onBlur={formik.handleBlur('address')}
                                    value={formik.values.address}
                                    ></input>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.address && formik.errors.address
                                        }
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <input type='text' className='form-control' placeholder='Apartment, Suite, etc'
                                    name='other'
                                    onChange={formik.handleChange('other')}
                                    onBlur={formik.handleBlur('other')}
                                    value={formik.values.other}
                                    ></input>
                                </div>
                                <div className='flex-grow-1'>
                                    <input type='text' className='form-control' placeholder='City'
                                    name='city'
                                    onChange={formik.handleChange('city')}
                                    onBlur={formik.handleBlur('city')}
                                    value={formik.values.city}></input>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.city && formik.errors.city
                                        }
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <select id=''className='form-control form-select' 
                                    name='state'
                                    onChange={formik.handleChange('state')}
                                    onBlur={formik.handleBlur('state')}
                                    value={formik.values.state}
                                    >
                                        <option value="" selected disabled>Select State</option>
                                        <option value="TpHoChiMinh" >TP HoChiMinh</option>
                                    </select>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.state && formik.errors.state
                                        }
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input type='text' className='form-control' placeholder='Pincode'
                                    name='pincode'
                                    onChange={formik.handleChange('pincode')}
                                    onBlur={formik.handleBlur('pincode')}
                                    value={formik.values.pincode}
                                    ></input>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.pincode && formik.errors.pincode
                                        }
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Link className='text-dark' to="/cart"><BiArrowBack className='me-2' />Return to Cart</Link>
                                        <Link className='button' to="/product">Continue to Shopping</Link>
                                        <button  className='button' type="submit">Place Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='border-bottom py-4'>
                            {
                                cartState && cartState?.map((item,index)=>{
                                    return(
<div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                                <div className='w-75 d-flex gap-10'>
                                    <div className='w-25 position-relative'>
                                        <span style={{ top:"-10px",right:"2px" }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                                        <img width={100} height={100}  src={item?.productId?.images[0]?.url} alt='product' />
                                    </div>
                                    <div>
                                        <h5 className='total-price'>{item?.productId?.title}</h5>
                                        <p className='total-price'>{item?.color?.title}</p>
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <h5 className='total'>
                                        $ {item?.price * item?.quantity}
                                    </h5>
                                </div>
                            </div>
                                    )
                                })
                            }
                            
                        </div>
                        <div className='border-bottom py-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total'>
                                    SubTotal
                                </p>
                                <p className='total-price'>$ {totalAmount?totalAmount:"0"}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 total'>Shipping</p>
                                <p className='mb-0 total-price'>$ 5</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                            <h4 className='total'>Total</h4>
                            <h5 className='total-price'>$ {totalAmount?totalAmount+5:"0"}</h5>

                        </div>
                    </div>
                </div>
        </Container>
    </>
  )
}

export default Checkout