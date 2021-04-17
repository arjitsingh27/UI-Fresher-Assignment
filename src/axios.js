import axios from 'axios'


const instance = axios.create({
    baseURL: "https://5fbcebcf3f8f90001638c720.mockapi.io/api/v1/"
})

export default instance