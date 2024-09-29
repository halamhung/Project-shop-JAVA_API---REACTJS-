import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
    const res = await axios.get(`${url}?page=${page}&&size=6`)
    return res.data
})

export const updateStatus = createAsyncThunk('orders/updateStatus', async ({id,status}, thunkAPI) => {
    const url1 = url + `/updateStatus/${id}`

    try {
        const response = await axios.put(url1, {status});
        return response.data
        // const response = await axios.delete(url, {
        //     auth: {
        //         username, // Sử dụng username từ localStorage
        //         password  // Sử dụng password từ localStorage
        //     }
        // });
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
// { "consignee": "", "addressConsignee": "", "phoneConsignee": "", "orderDate": 0 }
export const search = createAsyncThunk("orders/search", async ({ consignee, addressConsignee, phoneConsignee, orderDate }, apiThunk) => {
    const url1 = url + `/search?consignee=${consignee}&addressConsignee=${addressConsignee}&phoneConsignee=${phoneConsignee}&orderDate=${orderDate}`
    try {
        const response = await axios.get(url1);
        return response.data // Trả về dữ liệu từ phản hồi
    } catch (error) {
        return apiThunk.rejectWithValue(error.response.data) // Trả về lỗi nếu có
    }
})

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.orders = action.payload.data.orderResponses
                state.totalPages = action.payload.data.totalPages
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.orders = action.error.payload
            }) 
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.orders = state.orders.map(order =>
                    order.id === action.payload.data.id ? action.payload.data : order
                );
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.orders = action.error.payload
            })
            .addCase(search.fulfilled, (state, action) => {
                state.orders = action.payload.data
                state.status = action.payload.status
            })
            .addCase(search.rejected, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.error = action.payload.data
            })

    },
});

// export const { signIn } = usersSlice.actions;
export default orderSlice.reducer;
