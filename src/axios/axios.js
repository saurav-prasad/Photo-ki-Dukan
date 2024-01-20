import axios from "axios";
const key = '20703020-f313b201821c066216dd7cd98'
const photoURL = `https://pixabay.com/api/?key=${key}`

export const searchPhoto = axios.create({
    baseURL: `${photoURL}`
})
