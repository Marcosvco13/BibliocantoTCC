import axios from "axios";

const api = axios.create({
    baseURL: "https://d684-2804-56c-d74e-8b00-8115-540e-9dc0-b260.ngrok-free.app" + "/",
});

export default api;