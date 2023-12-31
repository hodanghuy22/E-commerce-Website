import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


const Header = () => {
  const dispatch = useDispatch()
  const userCartState = useSelector(state => state?.auth?.cartProducts)
  const authState = useSelector(state => state?.auth);
  const [total, setTotal] = useState(null)
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector(state => state?.product?.product)
  const [productOpt, setProductOpt] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    let sum = 0;
    for(let index=0; index<userCartState?.length;index++){
        sum += (Number(userCartState[index].quantity) * userCartState[index].price)
        setTotal(sum)
    }
  }, userCartState)

  useEffect(()=>{
    let data = []
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({id:index, prod:element?._id,name:element?.title})
    }
    setProductOpt(data)
  },[productState])

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <>
      <header className='header-top-strip py-3'>
        <div class="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel: +91 8265795468">
                  +91 8265795468
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <h2>
                <Link className='text-white'>Dev Corner</Link>
              </h2>
            </div>
            <div className='col-5'>
              <div className="input-group">
              <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        onChange={(selected)=>{
          navigate(`/product/${selected[0].prod}`)
        }}
        options={productOpt}
        paginate={paginate}
        labelKey={"name"}
        placeholder="Search for Products here..."
      />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link to='/compare-product' className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/compare.svg" alt="compare" />
                    <p className='mb-0'>Compare <br /> Products</p>
                  </Link>
                </div>
                <div>
                  <Link to='/WishList' className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p className='mb-0'>Favourite <br /> Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link to={authState?.user === null?'/login':'/my-profile'}
                  className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/user.svg" alt="user" />
                    {
                      authState?.user === null?<p className='mb-0'>Login <br /> My Account</p>:<p className='mb-0'>Welcome <br /> { authState?.user?.lastname}</p>
                    }
                  </Link>
                </div>
                <div>
                  <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                    <img src="images/cart.svg" alt="cart" />
                    <div className='d-flex flex-column gap-10'>
                      <span className='badge bg-white text-dark'>{userCartState?.length?userCartState?.length:0}</span>
                      <p className='mb-0'>$ {total? total: 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='heder-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="images/menu.svg" alt="menu" />
                      <span className='me-5 d-inline-block'>SHOP CATEGORIES</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button onClick={()=>handleLogout()} className='border border-0 bg-transparent text-white text-uppercase' type='button'>Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;