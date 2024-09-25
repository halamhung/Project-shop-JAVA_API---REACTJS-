// store.js
import { configureStore } from '@reduxjs/toolkit';
import LogInSignUpSlice from './LogInSignUpSlice'

const store = configureStore({
    reducer: {
        AccountUser: LogInSignUpSlice
    },
})

export default store;