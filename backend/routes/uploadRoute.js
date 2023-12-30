const express = require('express');
const { uploadImages, deleteImages } = require('../controller/uploadCtrl');
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');

// Phải đặt các tuyến có cùng Phương thức trước các tuyến có cùng phương thức nhưng có :id ví dụ là router.put để tránh bị xung đột
router.post('/', authMiddleware, isAdmin, uploadPhoto.array('images',10),productImgResize, uploadImages)
router.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages)

module.exports = router;