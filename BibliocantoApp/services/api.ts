import axios from "axios";

const api = axios.create({
    baseURL: "https://7f3f-2804-56c-d7df-b500-d85a-e74d-d049-6e4e.ngrok-free.app/",
});

export default api;