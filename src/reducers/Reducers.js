// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//     uid: 0,
//     token: ''
// }

// export const authReducer = createReducer(initialState, {
//     login: (state, action) => {
//         state.uid = action.payload.uid;
//         state.token = action.payload.token;
//     },
//     logout: (state, action) => {
//         state.uid = 0;
//         state.token = '';
//     }
// })

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: 0,
    token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.uid = action.payload.uid;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.uid = 0;
            state.token = '';
        }
    }
})

export const { login, logout} = authSlice.actions;
export default authSlice.reducer