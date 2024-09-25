import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    status: null,
    error: null,
    category: [],
    totalPage: 0,
}




const categorySlice = createSlice ({
    name: "category",
    initialState,
    reducers: {},
    extraReducers:(builder) => {

    }
})

export const 
export default categorySlice.reducer