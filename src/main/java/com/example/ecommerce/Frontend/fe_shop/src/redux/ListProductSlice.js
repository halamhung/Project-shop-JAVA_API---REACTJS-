import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/api'

export const getListProduct = createAsyncThunk("/getListProduct",async({currentPage,limit},thunkAPI)=>{
    const url = `${BASE_URL}/products?page=${currentPage}&size=${limit}`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const ListProductSlice = createSlice({
    name:"GetListProduct",
    initialState:{
        products:[],
        status: 'start',
        message:"",
        error: null,
        currentPage: 0,
        totalPage: 30,
        productDetail: [],
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getListProduct.fulfilled, (state,action)=>{
            state.status = action.payload.status;
            state.products = action.payload.data.productResponses; 
        })
        .addCase(getListProduct.rejected, (state,action)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error = action.payload.error;
        })
    }
})
export default ListProductSlice.reducer;