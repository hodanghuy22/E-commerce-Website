const Coupon = require('../models/couponModel')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');


const createCoupon = asyncHandler(async(req,res)=>{
    try{
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    }catch(err){
        throw new Error(err)
    }
})

const getAllCoupons = asyncHandler(async(req,res)=>{
    try{
        const coupons = await Coupon.find();
        res.json(coupons);
    }catch(err){
        throw new Error(err)
    }
})

const updateCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id);
    try{
        const updateCoupon = await Coupon.findByIdAndUpdate(id,req.body,{
            new:true
        });
        res.json(updateCoupon);
    }catch(err){
        throw new Error(err)
    }
})

const deleteCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id);
    try{
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon);
    }catch(err){
        throw new Error(err)
    }
})

const getCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id);
    try{
        const getACoupon = await Coupon.findById(id);
        res.json(getACoupon);
    }catch(err){
        throw new Error(err)
    }
})


module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, getCoupon }