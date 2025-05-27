import axios from "axios";

const api = axios.create({
    baseURL: "https://d257-2804-56c-c254-6700-1ccc-9860-4d2-f87f.ngrok-free.app" + "/",
});

export default api;