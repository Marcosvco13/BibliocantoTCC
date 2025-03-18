import axios from "axios";

const api = axios.create({
    baseURL: "https://a086-2804-56c-c258-e000-4912-ca6-3c79-1b19.ngrok-free.app/",
});

export default api;