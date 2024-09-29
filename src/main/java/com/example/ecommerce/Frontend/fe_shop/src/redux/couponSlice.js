import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



   const baseURL= "http://localhost:8080/coupoun"



export const getAllCoupon = createAsyncThunk('coupon/getAllCoupon', async(page, thunkAPI) => {
    try {
        const response = await axios.get(`${baseURL}/list-page?page=${page}&size=6`)
        return response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}
)
export const updateCoupon = createAsyncThunk("coupon/updateCoupon", async({id, couponDTO}, thunkAPI) => {
    try {
        const response = await axios.put(`${baseURL}/update/${id}`, couponDTO);
        return response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const addCoupoun = createAsyncThunk("coupon/addCoupoun", async(couponDTO, thunkAPI) => {
    try {
        const response = await axios.post(`${baseURL}/add-coupon`, couponDTO);
        return response.data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data);
    }
})


export const deleteCoupon = createAsyncThunk("coupon/deleteCoupon", async(id, thunkAPI) => {
    try {
        const response = await axios.delete(`${baseURL}/delete/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




const initialState = {
    status: null,
    error: null,
    message: "",
    coupon: [],
    currentPage: 1,
    totalPages: 10,
}




const couponSlice = createSlice ({
    name: "coupon",
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
            // state.message = action.payload.message
            // state.status = action.payload.status
            state.coupon = action.payload.data.couponListResponse
            state.totalPages = action.payload.data.totalPages
        })
        .addCase(getAllCoupon.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
        .addCase(updateCoupon.fulfilled, (state, action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.coupon = state.coupon.map(coupon => 
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
            state.coupon = [...state.coupon, action.payload.data]
        })
        .addCase(deleteCoupon.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status    
            state.coupon = state.coupon.filter(item => item.id !== action.payload.data)
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