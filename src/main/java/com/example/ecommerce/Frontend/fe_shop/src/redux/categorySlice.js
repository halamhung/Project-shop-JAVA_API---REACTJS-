import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const axiosBase = axios.create({
    baseURL:"http://localhost:8080/category",
})


export const getAllCategory = createAsyncThunk('cate/getAllCate', async({currentPage, limit}, thunkAPI) => {
    try {
        const response = await axiosBase.get(`/list?page=${currentPage}&limit=${limit}`)
        return response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}
)
export const updateCategory = createAsyncThunk("cate/updateCate", async({id, categorydto}, thunkAPI) => {
    try {
        const response = await axiosBase.put(`/update-category/${id}`, categorydto);
        return response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const addCategory = createAsyncThunk("cate/addCate", async({categorydto}, thunkAPI) => {
    try {
        const response = await axiosBase.post(`/add-category`, categorydto);
        return response.data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteCategory = createAsyncThunk("cate/delete", async({id}, thunkAPI) => {
    try {
        const response = await axiosBase.delete(`/delete-category/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




const initialState = {
    status: 'idle',
    error: null,
    message: '',
    category: [],
    currentPage: 0,
    totalPage: 0,   
}




const categorySlice = createSlice ({
    name: "category",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategory.fulfilled, (state, action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.category = action.payload.data.categoryResponseList
            state.totalPage = action.payload.data.totalPages
        })
        .addCase(getAllCategory.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.category = state.category.map(cate => 
                cate.id === action.payload.data.id ? action.payload.data : cate 
            )
        })
        .addCase(updateCategory.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
        .addCase(addCategory.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
        .addCase(addCategory.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.category = [...state.category, action.payload.data]
        })
        .addCase(deleteCategory.fulfilled, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status  
        })
        .addCase(deleteCategory.rejected, (state,action) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.error = action.payload.data
        })
    }
})

export const {resetStatusAndMessage} = categorySlice.actions
export default categorySlice.reducer