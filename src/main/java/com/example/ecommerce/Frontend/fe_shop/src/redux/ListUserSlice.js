import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export const getListUser = createAsyncThunk("employee/getListUser", async ({ currentPage, limit }, thunkAPI) => {
    const url = `${BASE_URL}/employee/all?page=${currentPage}&size=${limit}`;

    // Lấy username và password từ localStorage
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
        return thunkAPI.rejectWithValue('User is not logged in');
    }

    try {       
        const response = await axios.get(url, {
            auth: {
                username, // Sử dụng username từ localStorage
                password  // Sử dụng password từ localStorage
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async(id, thunkAPI)=>{
    const url = `${BASE_URL}/admin/delete/${id}`
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    try {
        const response = await axios.delete(url,{
            auth: {
                username, // Sử dụng username từ localStorage
                password  // Sử dụng password từ localStorage
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateRoleUser = createAsyncThunk("admin/setRoleUser", async ({ id, role }, thunkAPI) => {
    const url = `${BASE_URL}/admin/setRole/${id}`;
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    
    try {
        const response = await axios.put(url, 
            { roleName: role }, // Gửi role được chọn trong body
            {
                auth: {
                    username, // Sử dụng username từ localStorage
                    password  // Sử dụng password từ localStorage
                }
            }
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


const ListUserSlice = createSlice({
    name:"GetListUser",
    initialState:{
        listUser:[],
        status:'idle',
        message:"",
        error:null
    },
    reducers:{},
    extraReducers:(build)=>{
        build
        .addCase(getListUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.listUser = action.payload.data; // Access the data array inside the payload
        })
        .addCase(updateRoleUser.fulfilled, (state, action) => {
            state.status = 'updated';
            state.message = "Role updated successfully";
        })
        .addCase(updateRoleUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        // Xử lý xóa user
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'deleted';
            state.message = "User deleted successfully";
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
})

export default ListUserSlice.reducer;