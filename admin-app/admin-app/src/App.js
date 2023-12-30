import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import ProductList from './pages/ProductList';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/AddBrand';
import Addproduct from './pages/Addproduct';
import CouponList from './pages/CouponList';
import AddCoupon from './pages/AddCoupon';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
      <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
        <Route index element={<Dashboard />}/>
        <Route path='enquiries' element={<Enquiries />}/>
        <Route path='enquiries/:id' element={<ViewEnquiry />}/>
        <Route path='blog-list' element={<Bloglist />}/>
        <Route path='blog-add' element={<Addblog />}/>
        <Route path='blog-add/:id' element={<Addblog />}/>
        <Route path='blog-category-list' element={<Blogcatlist />}/>
        <Route path='blog-category' element={<Addblogcat />}/>
        <Route path='blog-category/:id' element={<Addblogcat />}/>
        <Route path='coupon-list' element={<CouponList />}/>
        <Route path='coupon' element={<AddCoupon />}/>
        <Route path='coupon/:id' element={<AddCoupon />}/>
        <Route path='orders' element={<Orders />}/>
        <Route path='order/:id' element={<ViewOrder />}/>
        <Route path='customers' element={<Customers />}/>
        <Route path='color' element={<Addcolor />}/>
        <Route path='color/:id' element={<Addcolor />}/>
        <Route path='color-list' element={<Colorlist />}/>
        <Route path='category' element={<AddCat />}/>
        <Route path='category/:id' element={<AddCat />}/>
        <Route path='category-list' element={<Categorylist />}/>
        <Route path='brand' element={<AddBrand />}/>
        <Route path='brand/:id' element={<AddBrand />}/>
        <Route path='brand-list' element={<Brandlist />}/>
        <Route path='product' element={<Addproduct />}/>
        <Route path='product-list' element={<ProductList />}/>
      </Route>
    </Routes>
   </Router>
  );
}

export default App;
