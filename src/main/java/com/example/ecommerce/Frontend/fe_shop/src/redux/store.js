// store.js
import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';
import productSlice from "./productSlice";
import LogInSignUpSlice from './LogInSignUpSlice'
import ListUserSlice from './ListUserSlice'
import ListProductSlice from './ListProductSlice'
import categorySlice from './categorySlice'
import couponSlice from './couponSlice';
import cartSlice from './cartSlice';
const store = configureStore({
    reducer: {
        products: productSlice,
        orders: orderSlice,
        AccountUser: LogInSignUpSlice,
        GetListUser: ListUserSlice,
        GetListProduct: ListProductSlice,
        category: categorySlice,
        coupon : couponSlice,
        carts: cartSlice
    },
})

export default store