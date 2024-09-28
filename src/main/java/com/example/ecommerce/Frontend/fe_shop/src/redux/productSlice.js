// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/api/products";

const initialState = {
    products: [],
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 1,
};
export const fetchCategories = createAsyncThunk(
    "product/fetchCategories",
    async () => {
        const res = await axios.get(`${url}/categories`);
        return res.data.data; // Assuming your API response structure
    }
);

export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async (page) => {
        const res = await axios.get(`${url}?page=${page}&size=10`);
        return res.data;
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, updatedProduct }) => {
        const res = await axios.put(`${url}/${id}`, updatedProduct);
        return res.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
        const res = await axios.delete(`${url}/${id}`);
        return id;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload.data.productResponses.map(product => ({
                    ...product,
                    status: product.quantity > 0 ? (product.quantity > 100 ? 1 : 0) : 0 // Cập nhật trạng thái dựa trên quantity
                }));
                state.currentPage = action.payload.data.currentPage;
                state.totalPages = action.payload.data.totalPages;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                // Cập nhật sản phẩm trong danh sách sau khi chỉnh sửa thành công
                const updatedProduct = action.payload.data;
                const index = state.products.findIndex(p => p.productId === updatedProduct.productId);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            });
    },
});

export default productSlice.reducer;