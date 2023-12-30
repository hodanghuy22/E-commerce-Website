import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "./pcategoryService";

export const getCategories = createAsyncThunk('productCategory/get-categories', async(thunkAPI) =>{
    try{
        return await pcategoryService.getProductCategories();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const createCategory = createAsyncThunk(
    "productCategory/create-category",
    async (categoryData, thunkAPI) => {
      try {
        return await pcategoryService.createCategory(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getAPCategory = createAsyncThunk('productCategory/get-category', async(id,thunkAPI) =>{
    try{
        return await pcategoryService.getProductCategory(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const updateAPCategory = createAsyncThunk(
    "productCategory/update-category",
    async (category, thunkAPI) => {
      try {
        return await pcategoryService.updateProductCategory(category);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const deleteACategory = createAsyncThunk('productCategory/delete-category', async(id,thunkAPI) =>{
    try{
        return await pcategoryService.deleteProductCategory(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    pCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const pcategorySlice = createSlice({
    name: "pCategories",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        }).addCase(getCategories.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pCategories = action.payload;
        }).addCase(getCategories.rejected, (state, action)=>{
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
        }).addCase(getAPCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAPCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.categoryName = action.payload.title;
        }).addCase(getAPCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updateAPCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateAPCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCategory = action.payload;
        }).addCase(updateAPCategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteACategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteACategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCategory = action.payload;
        }).addCase(deleteACategory.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    }
})

export default pcategorySlice.reducer;