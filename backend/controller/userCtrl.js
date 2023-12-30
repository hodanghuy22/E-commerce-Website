const { generateToken } = require('../config/jwToken');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderMode');
const uniqid = require('uniqid')

const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailCtrl');
const crypto = require("crypto")

// create a user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // create a new User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");    
  } 
});

// login a user
const loginUserCtrl = asyncHandler(async (req,res) => {
  const {email, password } = req.body;
  // check if user exist or not
  const findUser = await User.findOne({email});
  if(findUser && await findUser.isPassowrdMatched(password)){
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id, 
      {
        refreshToken: refreshToken,
      },
      {
        new:true,
      })
    res.cookie('refreshToken', refreshToken,{
      httpOnly: true,
      maxAge: 72*60*60*1000,
    })
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id)
    });
  }else{
    throw new Error("Invalid Credentials")
  }
})

// admin login
const loginAdmin = asyncHandler(async (req,res) => {
  const {email, password } = req.body;
  // check if user exist or not
  const findAdmin = await User.findOne({email});
  if(findAdmin.role !== "admin"){
    throw new Error("Not Authorized ")
  }
  if(findAdmin && await findAdmin.isPassowrdMatched(password)){
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin.id, 
      {
        refreshToken: refreshToken,
      },
      {
        new:true,
      })
    res.cookie('refreshToken', refreshToken,{
      httpOnly: true,
      maxAge: 72*60*60*1000,
    })
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id)
    });
  }else{
    throw new Error("Invalid Credentials")
  }
})

// handle refresh token
const handleRefreshToken = asyncHandler(async(req,res)=>{
  const cookie = req.cookies;
  if(!cookie?.refreshToken){
    throw new Error("No Refresh Token In Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken})
  if(!user){
    throw new Error("NO Refresh Token present in db or not matched");
  }
  jwt.verify(refreshToken,process.env.JWt_SECRET, (err, decoded)=>{
    if(err || user.id != decoded.id){
      throw new Error('There is something wrong with refresh token')
    }
    const accessToken = generateToken(user?._id)
    res.json({accessToken})
  })
})

// logout funtionality
const logout = asyncHandler(async(req,res)=>{
  const cookie = req.cookies;
  if(!cookie?.refreshToken){
    throw new Error("No Refresh Token In Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken})
  if(!user){
    res.clearCookie('refreshToken',{
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbiden
  }
  await User.findOneAndUpdate({ refreshToken: refreshToken }, {
    refreshToken: "",
  })
  res.clearCookie('refreshToken',{
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbiden
})

// save user address
const saveAddress = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  validateMongoDbId(_id);
  try{
    const updateAUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      });
    res.json(updateAUser)
  }catch(err){
    throw new Error(err);
  }
})


//get all user
const getAllUSer = asyncHandler(async(req,res) => {
  try{
    const getUsers = await User.find()
    res.json(getUsers)
  }catch(err){
    throw new Error(err);
  }
})

// get a single user
const getAUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  validateMongoDbId(id);
  try{
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    })
  }catch(err){
    throw new Error(err);
  }
})

// delete a single user
const deleteAUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  validateMongoDbId(id);
  try{
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser ,
    })
  }catch(err){
    throw new Error(err);
  }
})

// update a user
const updateAUser = asyncHandler(async (req,res) => {
  const {_id} = req.user;
  validateMongoDbId(_id);
  try{
    const updateAUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      });
    res.json(updateAUser)
  }catch(err){
    throw new Error(err);
  }
})

// block a user
const blockUser = asyncHandler(async(req,res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try{
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      })
      res.json(blockUser)
  }catch(err){
    throw new Error(err)
  }
})

// unblock a user
const unblockUser = asyncHandler(async(req,res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try{
    const unblockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      })
      res.json(unblockUser)
  }catch(err){
    throw new Error(err)
  }
})

// Update Password
const updatePassword = asyncHandler(async(req,res)=>{
  const { _id } = req.user;
  const {password} = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
})

const forgotPasswordToken = asyncHandler(async(req,res)=>{
  const {email} = req.body;
  const user = await User.findOne({email})
  if(!user){
    throw new Error("User not found with this email");
  }
  try{
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    }
    sendEmail(data);
    res.json(token);
  }catch(err){
    throw new Error(err);
  }
})

const resetPassword = asyncHandler(async(req,res)=>{
  const {password} = req.body;
  const {token} = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {$gt: Date.now()},
  })
  if(!user){
    throw new Error("Token Expired, Please try again later");
  }
  user.password = password;
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save();
  res.json(user);
})

const getWishlist = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  try{
    const findUser = await User.findById(_id).populate('wishlist')
    res.json(findUser)
  }catch(err){
    throw new Error(err)
  }
})

const userCart = asyncHandler(async(req,res)=>{
  const { productId, color, quantity, price } = req.body;
  const {_id} = req.user
  validateMongoDbId(_id)
  try{
    
    let newCart = await new Cart({
      userId: _id,
      productId,
      color, 
      price,
      quantity
    }).save();
    res.json(newCart)
  }catch(err){
    throw new Error(err)
  }

})

const getUserCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  validateMongoDbId(_id);
  try{
    const cart = await Cart.find({
      userId: _id
    }).populate('productId').populate("color")
    res.json(cart);
  }catch(err){  
    throw new Error(err)
  }
})

const removeProductFromCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  const {cartItemId} = req.params;
  validateMongoDbId(_id);
  try{
    const deleteProductFromCart = await Cart.deleteOne({userId: _id, _id:cartItemId})
    res.json(deleteProductFromCart);
  }catch(err){  
    throw new Error(err)
  }
})

const emptyCart = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  validateMongoDbId(_id);
  try{
    const deleteCart = await Cart.deleteMany({userId: _id})
    res.json(deleteCart);
  }catch(err){  
    throw new Error(err)
  }
})

const updateProductQuantityFromCart =  asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  const {cartItemId, newQuantity} = req.params;
  validateMongoDbId(_id);
  try{
    const cartItem = await Cart.findOne({userId: _id, _id:cartItemId})
    cartItem.quantity = newQuantity
    cartItem.save()
    res.json(cartItem);
  }catch(err){  
    throw new Error(err)
  }
})

const createOrder = asyncHandler(async(req,res)=>{
  const {shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo} = req.body;
  const {_id} = req.user
  try{
    const order = await Order.create({
      shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount,paymentInfo,user:_id
    })
    res.json({
      order,
      success: true,
    })
  }catch(err){
    throw new Error(err);
  }

})

const getMyOrders = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  try{
    const orders = await Order.find({user:_id}).populate("user").populate("orderItems.product").populate("orderItems.color")
    res.json({
      orders
    })
  }catch(err){
    throw new Error(err)
  }
})

const getAllOrders = asyncHandler(async(req,res)=>{
  try{
    const orders = await Order.find().populate("user")
    res.json({
      orders
    })
  }catch(err){
    throw new Error(err)
  }
})

const getSingleOrder = asyncHandler(async(req,res)=>{
  const {id} = req.params
  try{
    const orders = await Order.findOne({_id:id}).populate("user").populate("orderItems.product").populate("orderItems.color")
    res.json({
      orders
    })
  }catch(err){
    throw new Error(err)
  }
})

const updateOrder = asyncHandler(async(req,res)=>{
  const {id} = req.params
  try{
    const orders = await Order.findById(id)
    orders.orderStatus = req.body.status
    await orders.save()
    res.json({
      orders
    })
  }catch(err){
    throw new Error(err)
  }
})


const getMonthWiseOrderIncome = asyncHandler(async(req,res)=>{
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date()
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt:{
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: {
          month: "$month"
        },
        amount: {
          $sum:"$totalPriceAfterDiscount"
        },
        count: {
          $sum:1
        }
      }
    }
  ])
  res.json(data)
})


const getYearTotalOrders = asyncHandler(async(req,res)=>{
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date()
  let endDate = "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt:{
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1
        },
        amount: {
          $sum:"$totalPriceAfterDiscount"
        }
      }
    }
  ])
  res.json(data)
})

// const emptyCart = asyncHandler(async(req,res)=>{
//   const {_id} = req.user;
//   validateMongoDbId(_id);
//   try{
//     const user = await User.findOne({_id})
//     const cart = await Cart.findOneAndRemove({orderby: user._id})
//     res.json(cart);
//   }catch(err){  
//     throw new Error(err)
//   }
// })

// const applyCoupon = asyncHandler(async(req,res)=>{
//   const {_id} = req.user;
//   validateMongoDbId(_id);
//   const {coupon} = req.body;
//   const validCoupon = await Coupon.findOne({name:coupon})
//   if(validCoupon === null){
//     throw new Error("Invalid Coupon");
//   }
//   const user = await User.findOne({_id})
//   let {products, cartTotal} = await Cart.findOne({orderby: user._id}).populate('products.product')
//   let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount)/100).toFixed(2)
//   await Cart.findOneAndUpdate(
//     {orderby: user._id},
//     {totalAfterDiscount},
//     {new:true})
//   res.json(totalAfterDiscount)
// })

// const createOrder = asyncHandler(async(req,res)=>{
//   const {_id} = req.user;
//   validateMongoDbId(_id);
//   const {COD, couponApplied} = req.body
//   try{
//     if(!COD){
//       throw new Error("Create cash order failed")
//     }
//     const user = await User.findById(_id);
//     let userCart = await Cart.findOne({orderby: user._id})
//     let finalAmout = 0;
//     if(couponApplied && userCart.totalAfterDiscount){
//       finalAmout = userCart.totalAfterDiscount
//     }else{
//       finalAmout = userCart.cartTotal * 100
//     }
//     let newOrder = await new Order({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmout, 
//         status: "Cash on Delivery",
//         created: Date.now(),
//         currency: "usd",
//       },
//       orderby: user._id,
//       orderStatus: "Cash on Delivery",
//     }).save();
//     let update = userCart.products.map((item)=>{
//       return {
//         updateOne:{
//           filter: {_id:item.product._id},
//           update:{$inc: {quantity: -item.count, sold: +item.count}} 
//         }
//       }
//     })
//     const updated = await Product.bulkWrite(update, {});
//     res.json({
//       message: "success"
//     })
//   }catch(err){
//     throw new Error(err)
//   }
// })

// const getOrders = asyncHandler(async(req,res)=>{
//   const {_id} = req.user;
//   validateMongoDbId(_id);
//   try{
//     const userorders = await Order.findOne({orderby: _id}).populate('products.product').populate('orderby').exec()
//     res.json(userorders)
//   }catch(err){
//     throw new Error(err)
//   }
// })

// const getAllOrders = asyncHandler(async(req,res)=>{
//   try{
//     const alluserorders = await Order.find().populate('products.product').populate('orderby').exec()
//     res.json(alluserorders)
//   }catch(err){
//     throw new Error(err)
//   }
// })

// const getOrderByUserId = asyncHandler(async(req,res)=>{
//   const {id} = req.params;
//   validateMongoDbId(id);
//   try{
//     const userorders = await Order.findOne({orderby: id}).populate('products.product').populate('orderby').exec()
//     res.json(userorders)
//   }catch(err){
//     throw new Error(err)
//   }
// })

// const updateOrderStatus = asyncHandler(async(req,res)=>{
//   const {status} = req.body;
//   const {id} = req.params
//   validateMongoDbId(id)
//   try{
//     const updateOrderStatus = await Order.findByIdAndUpdate(
//       id,{
//         orderStatus: status,
//         paymentIntent: {
//           status: status,
//         }
//       },{
//         new: true,
//       })
//       res.json(updateOrderStatus)
//   }catch(err){
//     throw new Error(err)
//   }
// })

module.exports = { createUser, loginUserCtrl,getAllUSer,getAUser, deleteAUser, updateAUser, blockUser, unblockUser, handleRefreshToken,logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, removeProductFromCart, updateProductQuantityFromCart,createOrder,getMyOrders, getMonthWiseOrderIncome, getYearTotalOrders, getAllOrders,getSingleOrder, updateOrder, emptyCart };
 