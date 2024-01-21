import axios from "axios";

const key = process.env.REACT_APP_PIXABAY_API_KEY
const photoURL = `https://pixabay.com/api/?key=${key}`

export const searchPhoto = axios.create({
    baseURL: `${photoURL}`
})
