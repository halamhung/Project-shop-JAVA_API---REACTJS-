import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const register = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    const url = `${BASE_URL}/users/register`;
    try {
        const response = await axios.post(url, userData);
        return response.data;
    } catch (error) {
        // Capture the validation error messages
        if (error.response && error.response.status === 400) {
            return thunkAPI.rejectWithValue(error.response.data); // Assuming the errors are in error.response.data
        }
        return thunkAPI.rejectWithValue(error.response?.data || 'Registration failed');
    }
});

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
        // Check if the error response contains the "User not found" message
        if (error.response && error.response.status === 404) {
            return thunkAPI.rejectWithValue("Sai tên tài khoản hoặc mật khẩu");
        }
        return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
});


const LogInSignUpSlice = createSlice({
    name:"AccountUser",
    initialState:{
        users:[],
        role: null,
        errorMessages: {},
        errorLogin: null
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
        .addCase(logIn.rejected, (state, action) => {
            state.errorLogin = action.payload; // Set error message on failure
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.users = action.payload.status
            state.message = action.payload.message
        })
        .addCase(register.rejected, (state, action) => {
            if (action.payload instanceof Array) {
                // If payload is an array of error messages
                const errorMessages = {};
                action.payload.forEach((errorMessage) => {
                    if (errorMessage.includes("Email")) {
                        errorMessages.email = errorMessage;
                    } else if (errorMessage.includes("Mật khẩu")) {
                        errorMessages.password = errorMessage;
                    } else if (errorMessage.includes("Tên phải có")) {
                        errorMessages.username = errorMessage;
                    } else if (errorMessage.includes("Số điện thoại")) {
                        errorMessages.phone = errorMessage;
                    } else if (errorMessage.includes("Địa chỉ")) {
                        errorMessages.address = errorMessage;
                    } else if (errorMessage.includes("Use name")){
                        errorMessage.username = errorMessage;
                    }
                });
                state.errorMessages = errorMessages;
            }
        });
    }
    
})

export default LogInSignUpSlice.reducer;
