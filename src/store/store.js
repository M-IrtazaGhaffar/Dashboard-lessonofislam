import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/Reducers";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})