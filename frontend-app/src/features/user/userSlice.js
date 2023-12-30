import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService';
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk("auth/register", async(userData,thunkAPI) =>{
    try{
        return await userService.register(userData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const loginUser = createAsyncThunk("auth/login", async(userData,thunkAPI) =>{
    try{
        return await userService.login(userData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getUserProductWishlist = createAsyncThunk("user/wishlist", async(thunkAPI) =>{
    try{
        return await userService.getUserWishlist();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const addProductToCart = createAsyncThunk("user/cart/add", async(cartData, thunkAPI) =>{
    try{
        return await userService.addToCart(cartData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getUserCart = createAsyncThunk("user/cart/get", async(data,thunkAPI) =>{
    try{
        return await userService.getCart(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const deleteCartProduct = createAsyncThunk("user/cart/product/delete", async(data,thunkAPI) =>{
    try{
        return await userService.removeProductFromCart(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateCartProduct = createAsyncThunk("user/cart/product/update", async(cartDetail,thunkAPI) =>{
    try{
        return await userService.updateProductFromCart(cartDetail);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const createAnOrder = createAsyncThunk("user/cart/create-order", async(orderDetail,thunkAPI) =>{
    try{
        return await userService.createOrder(orderDetail);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getUserOrders = createAsyncThunk("user/order/get", async(thunkAPI) =>{
    try{
        return await userService.getOrders();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateProfile = createAsyncThunk("user/profile/update", async(data,thunkAPI) =>{
    try{
        return await userService.updateUser(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const forgotPasswordToken = createAsyncThunk("user/password/token", async(data,thunkAPI) =>{
    try{
        return await userService.forgotPassToken(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetAPassword = createAsyncThunk("user/password/reset", async(data,thunkAPI) =>{
    try{
        return await userService.resetPass(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const deleteUserCart = createAsyncThunk("user/cart/delete", async(data,thunkAPI) =>{
    try{
        return await userService.emptyCart(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

const getCustomerfromLocalStorage = localStorage.getItem('customer')? JSON.parse(localStorage.getItem("customer")):null;

const initialState = {
    user: getCustomerfromLocalStorage,
    wishlist: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.info("User Created Successfully");
            }
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.payload.response.data.message);
            }
        }).addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loginedUser = action.payload;
            state.user = action.payload;
            if(state.isSuccess === true){
                localStorage.setItem('token', action.payload.token)
                toast.info("Login Successfully");
            }
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.payload.response.data.message);
            }
        }).addCase(getUserProductWishlist.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUserProductWishlist.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        })
        .addCase(getUserProductWishlist.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addProductToCart.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addProductToCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProduct = action.payload;
            if(state.isSuccess === true){
                toast.success("Add Successfully");
            }
        })
        .addCase(addProductToCart.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getUserCart.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUserCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProducts = action.payload;
        })
        .addCase(getUserCart.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteCartProduct.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteCartProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCartProduct = action.payload;
            if(state.isSuccess === true){
                toast.success("Delete Successfully");
            }
        })
        .addCase(deleteCartProduct.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Something Went Wrong");
            }
        }).addCase(updateCartProduct.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateCartProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCartProduct = action.payload;
            if(state.isSuccess === true){
                toast.success("Updated Successfully");
            }
        })
        .addCase(updateCartProduct.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Something Went Wrong");
            }
        }).addCase(createAnOrder.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createAnOrder.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orderedProduct = action.payload;
            if(state.isSuccess === true){
                toast.success("Ordered Successfully");
            }
        })
        .addCase(createAnOrder.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Something Went Wrong");
            }
        }).addCase(getUserOrders.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getUserOrders.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orders = action.payload;
        })
        .addCase(getUserOrders.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updateProfile.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedProfile = action.payload;
                let currentUserData = JSON.parse(localStorage.getItem("customer"))
                let newUserData = {
                    _id: currentUserData?._id,
                    token: currentUserData?.token,
                    firstname: action?.payload?.firstname,
                    lastname: action?.payload?.lastname,
                    email: action?.payload?.email,
                    mobile: action?.payload?.mobile,
                }
                localStorage.setItem("customer", JSON.stringify(newUserData))
                state.user = newUserData
                toast.success("Updated Successfully");
        })
        .addCase(updateProfile.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Something Went Wrong");
            }
        }).addCase(forgotPasswordToken.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(forgotPasswordToken.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedProfile = action.payload;
            if(state.isSuccess === true){
                toast.success("Email Send Successfully");
            }
        })
        .addCase(forgotPasswordToken.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Something Went Wrong");
            }
        }).addCase(resetAPassword.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(resetAPassword.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pass = action.payload;
            if(state.isSuccess === true){
                toast.success("Password Updated Successfully");
            }
        })
        .addCase(resetAPassword.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Something Went Wrong");
            }
        }).addCase(deleteUserCart.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteUserCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCart = action.payload;
        })
        .addCase(deleteUserCart.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default authSlice.reducer;