import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

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

export const logIn = createAsyncThunk("user/login", async(userData, thunkAPI) => {
    const url = `${BASE_URL}/users/login`;
    try {
        const response = await axios.post(url, userData);
        const userId = response.data.userId; // Đảm bảo userId được trả về từ response

        if (!userId) {
            throw new Error("User ID is undefined");
        }

        // Gọi API để lấy vai trò của người dùng sau khi đăng nhập
        const roleResponse = await axios.get(`${BASE_URL}/users/roleUser/${userId}`);
        return { ...response.data, role: roleResponse.data };
    } catch (error) {
        console.error("Error in login process:", error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


const LogInSignUpSlice = createSlice({
    name:"AccountUser",
    initialState:{
        users:[],
        role: null,
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(logIn.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.users = action.payload;
            state.role = action.payload.role;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.users = action.payload.status
            state.message = action.payload.message
        })
    }
    
})

export default LogInSignUpSlice.reducer;
