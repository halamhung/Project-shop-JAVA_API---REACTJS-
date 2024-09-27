import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const axiosBase = axios.create({
    baseURL:"http://localhost:8080/coupoun",
})


export const getAllCoupon = createAsyncThunk('coupon/getAllCoupon', async({currentPage, limit}, thunkAPI) => {
    try {
        const response = await axiosBase.get(`/list?page=${currentPage}&limit=${limit}`)
        return response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}
)
export const updateCoupon = createAsyncThunk("coupon/updateCoupon", async({id, couponDTO}, thunkAPI) => {
    try {
        const response = await axiosBase.put(`/update/${id}`, couponDTO);
        return response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const addCoupoun = createAsyncThunk("coupon/addCoupoun", async({couponDTO}, thunkAPI) => {
    try {
        const response = await axiosBase.post(`/add-coupon`, couponDTO);
        return response.data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data);
    }
})


export const deleteCoupon = createAsyncThunk("coupon/delete", async({id}, thunkAPI) => {
    try {
        const response = await axiosBase.delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




const initialState = {
    status: null,
    error: null,
    message: "",
    coupouns: [],
    currentPage: 0,
    totalPage: 0,
}




const couponSlice = createSlice ({
    name: "coupons",
    initialState,
    reducers: {
        resetStatusAndMessage: (state) => {
            state.error = null;
            state.message = ""
            state.status = null
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(getAllCoupon.fulfilled, (state, action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.coupouns = action.payload.data
            state.totalPage = action.payload.data.totalPages
        })
        .addCase(getAllCoupon.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
        .addCase(updateCoupon.fulfilled, (state, action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.coupouns = state.coupouns.map(coupon => 
                coupon.id === action.payload.data.id ? action.payload.data : coupon 
            )
        })
        .addCase(updateCoupon.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
        .addCase(addCoupoun.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
        .addCase(addCoupoun.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.coupouns = [...state.coupouns, action.payload.data]
        })
        .addCase(deleteCoupon.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status    
            state.coupouns = state.coupouns.filter(item => item.id !== action.payload.data)
        })
        .addCase(deleteCoupon.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
    }
})

export const {resetStatusAndMessage} = couponSlice.actions
export default couponSlice.reducer