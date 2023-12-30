import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contactService from './contactService';
import { toast } from 'react-toastify';


export const createAContact = createAsyncThunk("contact/post-contact", async(contactData,thunkAPI) =>{
    try{
        return await contactService.createEnquiry(contactData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

const initialState = {
    contact: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const contactSlice = createSlice({
    name: "contact",
    initialState: initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(createAContact.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createAContact.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.contact = action.payload;
            if(state.isSuccess === true){
                toast.success("Contact Form Submitted Successfully");
            }
        })
        .addCase(createAContact.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.error);
            }
        })
    }
})

export default contactSlice.reducer;