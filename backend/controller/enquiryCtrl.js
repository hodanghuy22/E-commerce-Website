const Enquiry = require('../models/enquiryModel')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createEnquiry = asyncHandler(async(req,res)=>{
    try{
        const newEnquiry = await Enquiry.create(req.body)
        res.json(newEnquiry);
    }catch(err){
        throw new Error(err)
    }
})

const updateEnquiry = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const updateEnquiry = await Enquiry.findByIdAndUpdate(id,req.body,{
            new:true,
        })
        res.json(updateEnquiry);
    }catch(err){
        throw new Error(err)
    }
})

const deleteEnquiry = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const deleteEnquiry = await Enquiry.findByIdAndDelete(id,req.body,{
            new:true,
        })
        res.json(deleteEnquiry);
    }catch(err){
        throw new Error(err)
    }
})

const getEnquiry = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const getEnquiry = await Enquiry.findById(id);
        res.json(getEnquiry)
    }catch(err){
        throw new Error(err)
    }
})

const getAllEnquiry = asyncHandler(async(req,res)=>{
    try{
        const getallEnquiry = await Enquiry.find();
        res.json(getallEnquiry)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquiry }