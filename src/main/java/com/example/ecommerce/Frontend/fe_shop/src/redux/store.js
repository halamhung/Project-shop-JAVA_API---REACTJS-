// store.js
import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';
import productSlice from "./productSlice";


const store = configureStore({
    reducer: {
        products: productSlice,
        orders: orderSlice
    },
})

export default store