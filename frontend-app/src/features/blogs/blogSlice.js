import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from './blogService';

export const getAllBlogs = createAsyncThunk("blog/get-blogs", async(thunkAPI) =>{
    try{
        return await blogService.getBlogs();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const getABlog = createAsyncThunk('blog/get-blog', async(id,thunkAPI) =>{
    try{
        return await blogService.getBlog(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

const initialState = {
    blog: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const blogSlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(getAllBlogs.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllBlogs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blog = action.payload;
        })
        .addCase(getAllBlogs.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getABlog.pending, (state) => {
            state.isLoading = true;
        }).addCase(getABlog.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.singleBlog = action.payload;
        }).addCase(getABlog.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default blogSlice.reducer;