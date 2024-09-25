// store.js
import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';


const store = configureStore({
    reducer: {
        orders: orderSlice
    },
})

export default store