import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buildQueries } from "@testing-library/react";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

const getListUser = createAsyncThunk("employee/getListUser", async(thunkAPI)=>{
        const url = `${BASE_URL}/employee/all`;
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
    reducers,
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