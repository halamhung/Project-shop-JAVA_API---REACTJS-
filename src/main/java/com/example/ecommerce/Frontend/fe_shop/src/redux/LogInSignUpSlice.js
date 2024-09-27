import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const register = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    const url = `${BASE_URL}/users/register`;
    try {
        const response = await axios.post(url, userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
        return thunkAPI.rejectWithValue(error.response?.data || 'Registration failed');
    }
});

export const logIn = createAsyncThunk("user/login", async(userData, thunkAPI) => {
    const url = `${BASE_URL}/users/login`;
    try {
        const response = await axios.post(url, userData);
        const userId = response.data.userId;

        if (!userId) {
            throw new Error("User ID is undefined");
        }

        // Gọi API để lấy vai trò của người dùng sau khi đăng nhập
        const roleResponse = await axios.get(`${BASE_URL}/users/roleUser/${userId}`);
        const roles = roleResponse.data;  // Lấy danh sách roles từ API

        const { username, password } = userData;  // Lấy username và password từ dữ liệu đầu vào
        const roleNames = roles.map(role => role.name);  // Lưu lại tên các vai trò

        // Lưu thông tin vào localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('roles', JSON.stringify(roleNames));  // Lưu role vào localStorage

        return { ...response.data, role: roles };
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
        errorLogin: null,
        registerSuccess: false, 
    },
    reducers:{
        clearRegisterSuccess: (state) => {
            state.registerSuccess = false;
        },
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
            state.registerSuccess = true; 
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
export const { clearRegisterSuccess } = LogInSignUpSlice.actions;
export default LogInSignUpSlice.reducer;
