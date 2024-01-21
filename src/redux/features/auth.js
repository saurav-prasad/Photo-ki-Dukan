import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            // console.log(state);
            const user = {
                ...action.payload,
            }
            //  console.log(user);
            state.user = { ...user }
        },
        signOut: (state, action) => {
            state.user = null
        }
    }
})

export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer