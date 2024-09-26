import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export const getListUser = createAsyncThunk("employee/getListUser", async({currentPage,limit},thunkAPI)=>{
        const url = `${BASE_URL}/employee/all?page=${currentPage}&size=${limit}`;
    try {       
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const ListUserSlice = createSlice({
    name:"GetListUser",
    initialState:{
        listUser:[]
    },
    reducers:{},
    extraReducers:(build)=>{
        build
        .addCase(getListUser.fulfilled,(state,action)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
        })
        .addCase(getListUser.rejected,(state,action)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error = action .payload.error;          
        })
    }
})

export default ListUserSlice.reducer;