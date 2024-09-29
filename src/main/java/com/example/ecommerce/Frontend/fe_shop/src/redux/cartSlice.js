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

export const addCartAsync = createAsyncThunk(
    "cart/addCartAsync",
    async (productId, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        return { ...response.data.data, qty: 1 }; // returning product data with qty
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );


const getProductId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        console.log('Hàm response trong cartSLice: ', response.data.data);
        return response.data.data
    } catch (error) {
        console.log('error: ', error);
    }
}



const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addCart: (state, action) => {
          
            const res = getProductId(action.payload);
            console.log('res trong add Cart: ', res);
           
            const index = state.carts.findIndex(
                (item) => item.producId === action.payload
            );
            if (index >= 0) {
                let newCart = state.carts;
                newCart[index].qty++;
                state.carts = newCart;
                console.log("state sau khi add đã có", state.carts)
                localStorage.setItem("carts", JSON.stringify(state.carts));
            } else {
                state.carts = [...state.carts, {...res.data, qty: 1}];
                console.log("state sau khi add chưa có ", state.carts)
                localStorage.setItem("carts", JSON.stringify(state.carts));
            }
        }, removeCart: (state, action) => {
            state.carts = state.carts.filter((item) => item.producId !== action.payload);
            localStorage.setItem("carts", JSON.stringify(state.carts));
          },
          clearCart: (state) => {
            state.carts = [];
            localStorage.setItem("carts", JSON.stringify(state.carts));
          },
          updateQty: (state, action) => {
            if (action.payload.flag) {
              state.carts = state.carts.map((item) =>
                item.producId === action.payload.id ? { ...item, qty: item.qty + 1 } : item
              );
              localStorage.setItem("carts", JSON.stringify(state.carts));
            } else {
              state.carts = state.carts.map((item) =>
                item.producId === action.payload.id
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
