import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";


const url = "http://localhost:8080/order";



const initialState = {
    orders: [],
    status: "start",
    error: null,
    currentPage: 1,
    totalPages: 10,
};


export const getAllOrder = createAsyncThunk('orders/getAllOrder', async (page) => {
    // const res = await axios.get(`${url}?page=${page}&&limit=5`)
    const res = await axios.get(`${url}?page=${page}&&size=10`)
    return res.data
})

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.orders = action.payload.data.orderResponses
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.status = 'failed'
                state.orders = action.error.payload
            })


    },
});

// export const { signIn } = usersSlice.actions;
export default orderSlice.reducer;
