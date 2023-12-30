import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {AiOutlineDashboard,AiOutlineLogout, AiOutlineShoppingCart, AiOutlineUser, AiOutlineBgColors, AiOutlinePicLeft, AiOutlinePicRight} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import {SiBrandfolder} from 'react-icons/si'
import {BiCategory, BiLogoBlogger} from 'react-icons/bi'
import {FaClipboardList, FaBlog} from 'react-icons/fa'
import {IoIosNotifications} from 'react-icons/io'
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {RiCouponLine} from 'react-icons/ri'

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className='text-white fs-5 text-center py-3 mb-0'>
            <span className='sm-logo'>HĐH</span>
            <span className='lg-logo'>Hồ Đăng Huy</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key === "signout"){
                localStorage.clear()
                window.location.reload()
              }else{
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4'/>,
                  label: "Brand"
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4'/>,
                  label: "Brand List"
                },
                {
                  key: 'category',
                  icon: <BiCategory className='fs-4'/>,
                  label: "Category"
                },
                {
                  key: 'category-list',
                  icon: <BiCategory className='fs-4'/>,
                  label: "Category List"
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4'/>,
                  label: "Color"
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4'/>,
                  label: "Color List"
                },
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <FaBlog className='fs-4' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'blog',
              icon: <BiLogoBlogger className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog-add',
                  icon: <FaBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaClipboardList className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <FaBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaClipboardList className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <AiOutlineLogout className='fs-4' />,
              label: 'Sign Out',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between ps-3 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicLeft /> : <AiOutlinePicRight />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-4 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
              <div className='d-flex gap-3 align-items-center dropdown'>
                <div>
                  <img width={32} height={32} src='https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/307358443_1470092360085082_2137442429792932827_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OKoQ1sx6fPAAX_GTS5a&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfArVx1QC5zagMMt5XGlQz47wRM8-HtKLRujK5zl2x1RBA&oe=64E22405' alt='' />
                </div>
                <div 
                  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"
                >
                  <h5 className='mb-0'>Huy</h5>
                  <p className='mb-0'>huy@gmail.com</p>
                </div>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><Link class="dropdown-item py-1 mb-1" style={{ "height":"auto", "lineHeight":"20px" }} to="/">View Profile</Link></li>
                  <li><Link class="dropdown-item py-1 mb-1" style={{ "height":"auto", "lineHeight":"20px" }} to="/">Sign Out</Link></li>
                </ul>
              </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer 
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout