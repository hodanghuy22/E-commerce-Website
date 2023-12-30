const express = require("express")
const router = express.Router();
const {createUser,loginUserCtrl, getAllUSer, getAUser, deleteAUser, updateAUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, createOrder, removeProductFromCart, updateProductQuantityFromCart, getMyOrders, getMonthWiseOrderIncome, getYearTotalOrders, getAllOrders, getSingleOrder, updateOrder, emptyCart} = require("../controller/userCtrl");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");

router.post('/register',createUser);
router.post('/forgot-passwort-token', forgotPasswordToken)
router.put('/reset-password/:token', resetPassword)
//router.put('/order/update-order/:id',authMiddleware,isAdmin, updateOrderStatus)

router.put('/password',authMiddleware,updatePassword);
router.post('/login',loginUserCtrl);
router.post('/admin-login',loginAdmin);
router.post('/cart', authMiddleware, userCart);
//router.post('/cart/applycoupon',authMiddleware,applyCoupon)
router.post('/cart/create-order',authMiddleware,createOrder)

router.get('/all-users', getAllUSer);
router.get('/getmyorders',authMiddleware, getMyOrders);
router.get('/get-allOrders',authMiddleware, isAdmin, getAllOrders);
router.get('/getaOrder/:id',authMiddleware, isAdmin, getSingleOrder);
router.put('/updateOrder/:id',authMiddleware, isAdmin, updateOrder);
//router.post('/getorderbyuser/:id',authMiddleware, isAdmin, getOrderByUserId);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logout);
router.get('/wishlist',authMiddleware, getWishlist);
router.get('/cart',authMiddleware, getUserCart);
router.get('/getMonthWiseOrderIncome',authMiddleware, getMonthWiseOrderIncome);
router.get('/getyearorders',authMiddleware, getYearTotalOrders);

router.post('/order/checkout',authMiddleware, checkout)
router.post('/order/paymentVerification',authMiddleware, paymentVerification)

router.get('/:id',authMiddleware,isAdmin, getAUser);
// router.delete('/emty-cart',authMiddleware, emptyCart)
router.delete('/delete-product-cart/:cartItemId',authMiddleware, removeProductFromCart)
router.delete('/update-product-cart/:cartItemId/:newQuantity',authMiddleware, updateProductQuantityFromCart)
router.delete('/:id', deleteAUser);
router.delete('/empty', authMiddleware, emptyCart);

router.put('/edit-user',authMiddleware , updateAUser);
router.put('/save-address',authMiddleware , saveAddress);
router.put('/block-user/:id',authMiddleware ,isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware ,isAdmin, unblockUser);

module.exports = router;