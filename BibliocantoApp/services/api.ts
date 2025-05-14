import axios from "axios";

const api = axios.create({
    baseURL: "https://1373-2804-56c-c238-3b00-e4a4-3e69-14c-e4b0.ngrok-free.app" + "/",
});

export default api;