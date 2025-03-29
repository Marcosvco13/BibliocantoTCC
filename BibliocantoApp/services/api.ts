import axios from "axios";

const api = axios.create({
    baseURL: "https://1e69-2804-56c-d7df-b500-1594-9cea-44f5-2327.ngrok-free.app/",
});

export default api;