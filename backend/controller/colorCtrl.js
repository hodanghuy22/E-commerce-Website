const Color = require('../models/colorModel')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createColor = asyncHandler(async(req,res)=>{
    try{
        const newColor = await Color.create(req.body)
        res.json(newColor);
    }catch(err){
        throw new Error(err)
    }
})

const updateColor = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const updateColor = await Color.findByIdAndUpdate(id,req.body,{
            new:true,
        })
        res.json(updateColor);
    }catch(err){
        throw new Error(err)
    }
})

const deleteColor = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const deleteColor = await Color.findByIdAndDelete(id,req.body,{
            new:true,
        })
        res.json(deleteColor);
    }catch(err){
        throw new Error(err)
    }
})

const getColor = asyncHandler(async(req,res)=>{
    const {id} = req.params
    validateMongoDbId(id)
    try{
        const getColor = await Color.findById(id);
        res.json(getColor)
    }catch(err){
        throw new Error(err)
    }
})

const getAllColor = asyncHandler(async(req,res)=>{
    try{
        const getallColor = await Color.find();
        res.json(getallColor)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = { createColor, updateColor, deleteColor, getColor, getAllColor }