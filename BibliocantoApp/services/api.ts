import axios from "axios";

const api = axios.create({
    baseURL: "https://4f73-2804-56c-d714-3b00-c45-7b8-5439-6ddf.ngrok-free.app/",
});

export default api;