import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";


const url = "https://63e9ae764f3c6aa6e7d06a70.mockapi.io/users";



const initialState = {
    orders: [],
    status: "start",
    error: null,
    currentPage: 1,
    totalPage: 30,
};


export const getAllOrder = createAsyncThunk('orders/getAllOrder', async (page) => {
    // const res = await axios.get(`${url}?page=${page}&&limit=5`)
    const res = await axios.get(`${url}?page=${page}&&limit=6`)
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
                state.orders = action.payload
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.status = 'failed'
                state.orders = action.error.payload
            })


    },
});

// export const { signIn } = usersSlice.actions;
export default orderSlice.reducer;
