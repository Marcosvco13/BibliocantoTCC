import axios from "axios";

const api = axios.create({
    baseURL: "https://3101-2804-56c-d7df-b500-1c8d-9211-a72f-d5ae.ngrok-free.app/",
});

export default api;