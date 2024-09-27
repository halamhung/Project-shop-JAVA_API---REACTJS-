import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";


const url = "http://localhost:8080/category";

const initialState = {
    category: [],
    status: "start",
    error: null,
    currentPage: 1,
    totalPages: 10,
};


export const getAllCategory = createAsyncThunk('category/getAllOrder', async (page) => {
    // const res = await axios.get(`${url}?page=${page}&&limit=5`)
    const res = await axios.get(`${url}/list?page=${page}&&size=5`)
    return res.data
})
export const createCategory = createAsyncThunk('category/getAllOrder', async (page) => {
    // const res = await axios.get(`${url}?page=${page}&&limit=5`)
    const res = await axios.get(`${url}/list?page=${page}&&size=5`)
    return res.data
})

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.category = action.payload.data.categoryResponseList
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.category = action.error.payload
            })


    },
});

// export const { signIn } = usersSlice.actions;
export default categorySlice.reducer;
