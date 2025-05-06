import axios from "axios";

const api = axios.create({
    baseURL: "https://8d26-2804-56c-c238-3b00-4983-a3b3-41b5-145e.ngrok-free.app" + "/",
});

export default api;