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
        console.log("Login response:", response.data); // Kiểm tra phản hồi từ API

        const userId = response.data.userId; // Giả sử response trả về userId
        if (!userId) {
            throw new Error("User ID is undefined"); // Ném lỗi nếu userId là undefined
        }

        // Sau khi đăng nhập thành công, gọi API lấy role của người dùng
        const roleResponse = await axios.get(`${BASE_URL}/users/roleUser/${userId}`);
        return { ...response.data, role: roleResponse.data };
    } catch (error) {
        console.error("Error in login process:", error); // Log lỗi
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
            state.users = action.payload.users;
            state.role = action.payload.role;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.users = action.payload.status
            state.message = action.payload.message
        })
    }
    
})

export default LogInSignUpSlice.reducer
