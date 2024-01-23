import { createSlice, nanoid } from "@reduxjs/toolkit"

let initialState = []

export const FavouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        createFavourite: (state, action) => {
            // console.log(action.payload);
            let favourite = action.payload
            favourite = favourite.map(data => { return { ...data, key: nanoid() } })
            // console.log(favourite);
            state.push(...favourite)
        },
        deleteFavourite: (state, action) => {
            const newState = state.filter((data) => data.image_id !== action.payload.id);
            return newState
        },
        addFavourite: (state, action) => {
            const favourite = {
                ...action.payload,
                key: nanoid()
            }
            state.push(favourite)
        },
    }
})



export const { createFavourite, deleteFavourite, addFavourite } = FavouriteSlice.actions

export default FavouriteSlice.reducer