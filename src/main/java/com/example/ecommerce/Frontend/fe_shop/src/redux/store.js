// store.js
import { configureStore } from '@reduxjs/toolkit';
import LogInSignUpSlice from './LogInSignUpSlice'

import orderSlice from './orderSlice';
import categorySlice from './categorySlice';
import couponSlice from './couponSlice';
const store = configureStore({
    reducer: {
        AccountUser: LogInSignUpSlice
        orders: orderSlice,
        category: categorySlice,
        coupon: couponSlice,
    },
})

export default store