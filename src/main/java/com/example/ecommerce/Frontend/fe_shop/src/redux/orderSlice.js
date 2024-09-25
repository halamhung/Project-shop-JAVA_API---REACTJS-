import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";


const url = "https://63e9ae764f3c6aa6e7d06a70.mockapi.io/users";



const initialState = {
    orders: [],
    status: "start",
    error: null,
};


export const getAllOrder = createAsyncThunk('users/fecthUsers', async () => {
    // const res = await axios.get(`${url}?page=${page}&&limit=5`)
    const res = await axios.get(`${url}`)
    return res.data
})

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fecthUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fecthUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload
            })
            .addCase(fecthUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.users = action.error.payload
            })
            .addCase(createUsers.fulfilled, (state, action) => {
                state.users = [...state.users, action.payload];
            });
        // .addCase(reCheck.fulfilled, (state, action) => {
        //     state.cats = state.cats.map(item => item.id === action.payload.id ? { ...item, status: !item.status } : item)
        // })
    },
});

export const { signIn } = usersSlice.actions;
export default usersSlice.reducer;
