import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://cuisine-quest-server.vercel.app"
})

export default instance