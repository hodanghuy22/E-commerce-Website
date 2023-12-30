import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../features/user/userSlice'

const Orders = () => {
    const dispatch = useDispatch()
    const orderState = useSelector(state => state?.auth?.orders?.orders)
    console.log(orderState);
    useEffect(()=>{
        dispatch(getUserOrders())
    },[])
    return (
     <>
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        {
            orderState && orderState?.map((item,index)=>{
                return(
                    <>
                    <div key={index} className='mb-5 bg-success'>
                    <div className='row p-3 bg-info'>
            <div className='col-3'>
                <h5>Order Id</h5>
            </div>
            <div className='col-3'>
                <h5>Total Amount</h5>
            </div>
            <div className='col-3'>
                <h5>Total Amount After Discount</h5>
            </div>
            <div className='col-3'>
                <h5>Status</h5>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-3'>
                <h5>{item?._id}</h5>
            </div>
            <div className='col-3'>
                <h5>{item?.totalPrice}</h5>
            </div>
            <div className='col-3'>
                <h5>{item?.totalPriceAfterDiscount}</h5>
            </div>
            <div className='col-3'>
                <h5>{item?.orderStatus}</h5>
            </div>
        </div>
        <table className='table table-light mt-3'>
            <thead className='table-dark'>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody className='table-success'>
                {
                    item?.orderItems?.map((i)=>{
                        return (
                            <tr>
                    <td>{i?.product.title}</td>
                    <td>{i?.quantity}</td>
                    <td>{i?.price}</td>
                    <td>{i?.color.title}</td>
                </tr>
                        )
                    })
                }
            </tbody>
        </table>
                    </div>
                    </>
                )
            })
        }
        
      </Container>
      
     </>
    )
}

export default Orders