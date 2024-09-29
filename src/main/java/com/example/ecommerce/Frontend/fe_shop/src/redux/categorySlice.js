import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";


const url = "http://localhost:8080/category";

const initialState = {
    category: [],
    status: "",
    message: "",
    error: null,
    currentPage: 1,
    totalPages: 10,
};
export const fetchCategories = createAsyncThunk(
    "product/fetchCategories",
    async () => {
        const res = await axios.get(`${url}/categories`); // Make sure this URL is correct
        return res.data.data;
    }
);

export const getAllCategory = createAsyncThunk('category/getAllOrder', async (page) => {
    // const res = await axios.get(`${url}?page=${page}&&limit=5`)
    const res = await axios.get(`${url}/list?page=${page}&&size=5`)
    return res.data
})
export const createCategory = createAsyncThunk('category/createCategory', async ({name}, thunkAPI) => {
    const url1 = url + `/add-category`

    try {
        const response = await axios.post(url1, {name});
        return response.data
        // const response = await axios.delete(url, {
        //     auth: {
        //         username, // Sử dụng username từ localStorage
        //         password  // Sử dụng password từ localStorage
        //     }
        // });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const updateCategory = createAsyncThunk('category/updateCategory', async ({id,name}, thunkAPI) => {
    const url1 = url + `/update-category/${id}`

    try {
        const response = await axios.put(url1, {name});
        return response.data
        // const response = await axios.delete(url, {
        //     auth: {
        //         username, // Sử dụng username từ localStorage
        //         password  // Sử dụng password từ localStorage
        //     }
        // });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id, apiThunk) => {
    const url1 = url + `/delete-category/${id}`
    try {
        const response = await axios.delete(url1);
        return response.data
    } catch (error) {
        return apiThunk.rejectWithValue(error.response.data)
    }
})


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        resetStatusAndMessage: (state) => {
            state.error = null;
            state.message = ""
            state.status = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.category = action.payload.data.categoryResponseList
                state.totalPages = action.payload.data.totalPages
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.category = action.error.payload
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.category = [...state.category, action.payload.data]

            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.error = action.payload.data
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.category = state.category.map(category =>
                    category.id === action.payload.data.id ? action.payload.data : category
                );

            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.error = action.payload.data
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.category = state.category.filter(item => item.id !== action.payload.data)
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.status = action.payload.status
                state.message = action.payload.message
                state.error = action.payload.data
            })

    },
});

export const { resetStatusAndMessage } = categorySlice.actions
export default categorySlice.reducer;
