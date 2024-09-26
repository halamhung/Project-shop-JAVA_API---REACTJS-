// store.js
import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';
import categorySlice from './categorySlice';
import couponSlice from './couponSlice';
const store = configureStore({
    reducer: {
        orders: orderSlice,
        category: categorySlice,
        coupon: couponSlice,
    },
})

export default store