import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

export const getBlogCategories = createAsyncThunk('blog/get-blogs', async(thunkAPI) =>{
    try{
        return await bcategoryService.getBlogCategories();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const createCategory = createAsyncThunk(
    "blog/create-category",
    async (categoryData, thunkAPI) => {
      try {
        return await bcategoryService.createCategory(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getABlogCategory = createAsyncThunk('blog/get-category', async(id,thunkAPI) =>{
    try{
        return await bcategoryService.getCategory(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateABlogCategory = createAsyncThunk(
    "blog/update-category",
    async (categoryData, thunkAPI) => {
      try {
        return await bcategoryService.updateCategory(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const deleteABlogCategory = createAsyncThunk('blog/delete-category', async(id,thunkAPI) =>{
    try{
        return await bcategoryService.deleteCategory(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    bcategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const bcategorySlice = createSlice({
    name: "bcategories",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getBlogCategories.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBlogCategories.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bcategories = action.payload;
        }).addCase(getBlogCategories.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(createCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(createCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCategory = action.payload;
        }).addCase(createCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getABlogCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(getABlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bCategoryName = action.payload.title;
        }).addCase(getABlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updateABlogCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateABlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCategory = action.payload;
        }).addCase(updateABlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteABlogCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteABlogCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCategory = action.payload;
        }).addCase(deleteABlogCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    }
})

export default bcategorySlice.reducer;