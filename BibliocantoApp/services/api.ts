import axios from "axios";

const api = axios.create({
    baseURL: "https://3ada-2804-56c-c238-3b00-f811-4a23-1d1b-967c.ngrok-free.app/",
});

export default api;