// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/api/users/products";

const initialState = {
    products: [],
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 1,
};
// productSlice.js
export const fetchCategories = createAsyncThunk(
    "product/fetchCategories",
    async () => {
        const res = await axios.get("http://localhost:8080/api/users/category/categories"); // Gọi API endpoint mới
        return res.data.data; // Trả về danh sách category
    }
);

export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async (page) => {
        const res = await axios.get(`${url}?page=${page}&size=6`);
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

const getProductImageId = async (id) => {
    try {
        const response = await axios.get(`${url}/getAllIamges/${id}`);
        return response.data;
    } catch(error) {
        console.log('error: ', error);
    }
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload; // Lưu danh sách category vào state
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload.data.productResponses.map(product => {
                    let newStatus = product.status; // Keep the original status

                    // Update status based on quantity only if the original status is not "Tạm ngưng bán" (2)
                    if (newStatus !== 2) {
                        newStatus = product.quantity > 0 ? 1 : 0;
                    }

                    return {
                        ...product,
                        status: newStatus
                    };
                });
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