import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const url = "http://localhost:8080/order";


const initialState = {
    status : "idle",
    error : null,
    products : [],
    message: "",
    carts: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
}

export const postNewOrder = createAsyncThunk("order/postOrder", async (orderdto, thunkAPI)=> {
    try {
        const resposne =  await axios.post(`${url}`, orderdto);
        console.log('orderdto: ', orderdto);
        return resposne.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})




const getProductId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
    }
}



const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const res = getProductId(action.payload.id);
            const index = state.carts.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index >= 0) {
                let newCart = state.carts;
                newCart[index].qty++;
                state.carts = newCart;
                localStorage.setItem("carts", JSON.stringify(state.carts));
            } else {
                state.carts = [...state.carts, {...res, qty: 1}];
                localStorage.setItem("carts", JSON.stringify(state.carts));
            }
        }, removeCart: (state, action) => {
            state.carts = state.carts.filter((item) => item.id !== action.payload);
            localStorage.setItem("carts", JSON.stringify(state.carts));
          },
          clearCart: (state) => {
            state.carts = [];
            localStorage.setItem("carts", JSON.stringify(state.carts));
          },
          updateQty: (state, action) => {
            if (action.payload.flag) {
              state.carts = state.carts.map((item) =>
                item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
              );
              localStorage.setItem("carts", JSON.stringify(state.carts));
            } else {
              state.carts = state.carts.map((item) =>
                item.id === action.payload.id
                  ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty }
                  : item
              );
              localStorage.setItem("carts", JSON.stringify(state.carts));
            }
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(postNewOrder.rejected, (state, action) => {
            state.status = action.payload.status
            state.error = action.payload.data
            state.message = action.payload.message
        })
        .addCase(postNewOrder.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.message = action.payload.message
            localStorage.setItem("cart", [])
            state.carts = []
        })
    }   
})

export const {addCart, removeCart, clearCart, updateQty} = cartSlice.actions;
export default cartSlice.reducer;
