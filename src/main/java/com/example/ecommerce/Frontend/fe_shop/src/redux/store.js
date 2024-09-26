// store.js
import { configureStore } from '@reduxjs/toolkit';
import LogInSignUpSlice from './LogInSignUpSlice'
import ListUserSlice from './ListUserSlice';
import ListProductSlice from './ListProductSlice';
import orderSlice from './orderSlice';
import categorySlice from './categorySlice';
import couponSlice from './couponSlice';
const store = configureStore({
    reducer: {
        AccountUser: LogInSignUpSlice,
        GetListUser: ListUserSlice,
        GetListProduct: ListProductSlice,
        orders: orderSlice,
        category: categorySlice,
        coupon: couponSlice,
    },
})

export default store