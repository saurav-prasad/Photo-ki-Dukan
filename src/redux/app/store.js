import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth'
import favouriteReducer from '../features/favourite'
import downloadsReducer from '../features/downloads'
export const store = configureStore({
    reducer: {
        authReducer,
        favouriteReducer,
        downloadsReducer
    }
})
