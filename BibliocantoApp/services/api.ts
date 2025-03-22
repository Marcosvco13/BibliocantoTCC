import axios from "axios";

const api = axios.create({
    baseURL: "https://2608-2804-56c-c258-e000-e59d-bb14-159d-6852.ngrok-free.app/",
});

export default api;