import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService';
import { toast } from 'react-toastify';

export const getAllProducts = createAsyncThunk("product/get-products", async(data,thunkAPI) =>{
    try{
        return await productService.getProducts(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getAProduct = createAsyncThunk("product/get-product", async(id, thunkAPI) =>{
    try{
        return await productService.getProduct(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const addToWishlist = createAsyncThunk("product/wishlist", async(prodId, thunkAPI) =>{
    try{
        return await productService.addToWishList(prodId);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const addRating = createAsyncThunk("product/rating", async(data, thunkAPI) =>{
    try{
        console.log("slice" ,data)
        return await productService.rateProduct(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})     

const initialState = {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(getAllProducts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        })
        .addCase(getAllProducts.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addToWishlist.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addToWishlist.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addToWishList = action.payload;
            state.message = "Product Added To Wishlist!";
        })
        .addCase(addToWishlist.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getAProduct.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.singleProduct = action.payload;
        })
        .addCase(getAProduct.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addRating.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addRating.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.rating = action.payload;
            state.message = "Rating Added Successfully"
            if(state.isSuccess === true){
                toast.success("Rating Updated Successfully");
            }
        })
        .addCase(addRating.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default productSlice.reducer;