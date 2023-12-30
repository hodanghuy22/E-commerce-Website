import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
import { toast } from 'react-toastify';


const getCustomerfromLocalStorage = localStorage.getItem('customer')? JSON.parse(localStorage.getItem("customer")):null;

export const getOrders = createAsyncThunk('order/get-orders', async(thunkAPI) =>{
    try{
        return await authService.getOrders();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getMonthData = createAsyncThunk('order/monthdata', async(thunkAPI) =>{
    try{
        return await authService.getMonthOrders();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getYearData = createAsyncThunk('order/yeardata', async(thunkAPI) =>{
    try{
        return await authService.getYearStats();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getOrder = createAsyncThunk('order/get-order', async(id,thunkAPI) =>{
    try{
        return await authService.getOrder(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateAOrder = createAsyncThunk('order/update-order', async(data,thunkAPI) =>{
    try{
        return await authService.updateOrder(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
}) 

const initialState = {
    user: getCustomerfromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


export const login = createAsyncThunk('auth/admin-login', async(user,thunkAPI) =>{
    try{
        return await authService.login(user);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                if(state.isSuccess){
                    toast.success("User Logged In Successfully")
                }
            })
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                if(state.isError){
                    toast.error(action.payload.response.data.message)
                }
            })
            .addCase(getOrders.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            }).addCase(getOrder.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
            })
            .addCase(getOrder.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            }).addCase(getMonthData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getMonthData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.monthData = action.payload;
            })
            .addCase(getMonthData.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            }).addCase(getYearData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getYearData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.yearData = action.payload;
            })
            .addCase(getYearData.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            }).addCase(updateAOrder.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(updateAOrder.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedOrder = action.payload;
                if(state.isSuccess){
                    toast.success("Updated Successfully")
                }
            })
            .addCase(updateAOrder.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                if(state.isError){
                    toast.error("Something Went Wrong")
                }
            })
    },
})

export default authSlice.reducer;