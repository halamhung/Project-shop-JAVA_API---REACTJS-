import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/api/products"; // Thay đổi URL cho phù hợp

const initialState = {
    products: [], // Đổi tên thành 'products'
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    totalPages: 1, // Khởi tạo totalPages là 1 để tránh lỗi
};

export const getAllProduct = createAsyncThunk( // Đổi tên thành 'getAllProduct'
    "product/getAllProduct", // Thay đổi action type
    async (page) => {
        const res = await axios.get(`${url}?page=${page}&size=10`); // Thay đổi size nếu cần
        return res.data;
    }
);

const productSlice = createSlice({ // Đổi tên thành 'productSlice'
    name: "products", // Thay đổi slice name
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload.data.productResponses; // Kiểm tra lại cấu trúc dữ liệu
                state.currentPage = action.payload.data.currentPage;
                state.totalPages = action.payload.data.totalPages;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;