import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import LogInSignUpSlice from './LogInSignUpSlice'

const LogInSignUpStore = configureStore({
    reducer:{
        AccountUser: LogInSignUpSlice
    }
})

export default LogInSignUpStore;
