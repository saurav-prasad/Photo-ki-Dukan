import { createSlice, nanoid } from "@reduxjs/toolkit"

let initialState = []

export const downloadsSlice = createSlice({
    name: 'downlods',
    initialState,
    reducers: {
        createDownloads: (state, action) => {
            // console.log(action.payload);
            let downlods = action.payload
            downlods = downlods.map(data => { return { ...data, key: nanoid() } })
            // console.log(downlods);
            state.push(...downlods)
        },
        deleteDownloads: (state, action) => {
            const newState = state.filter((data) => data.image_id !== action.payload.id);
            return newState
        },
        addDownloads: (state, action) => {
            const downlods = {
                ...action.payload,
                key: nanoid()
            }
            state.push(downlods)
        },
        clearDownloads: (state, action) => {
            state.length = 0
        },
    }
})

export const { createDownloads, deleteDownloads, addDownloads, clearDownloads } = downloadsSlice.actions

export default downloadsSlice.reducer