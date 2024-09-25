import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { act } from 'react';

const BASE_URL = 'http://localhost:8080/api';

export const register = createAsyncThunk("user/register", async(userData, thunkAPI)=>{
    const url = `${BASE_URL}/users/register`;
    try{
        const response = await axios.post(url, userData)
        return response.data;
    }
    catch (error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const logIn = createAsyncThunk("user/login", async(userData,thunkAPI)=>{
    const url =`${BASE_URL}/users/login`
    try{
        const response = await axios.post(url,userData)
        return response.data;
    }
    catch (error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const LogInSignUpSlice = createSlice({
    name:"AccountUser",
    initialState:{
        users:[]
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.fulfilled,(state,action)=>{
            state.student = action.payload.status
            state.message = action.payload.message
        })
    }
    
})

export default LogInSignUpSlice.reducer
