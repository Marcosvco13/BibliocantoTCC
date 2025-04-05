import axios from "axios";

const api = axios.create({
    baseURL: "https://2225-2804-56c-d714-3b00-d080-46d9-3b2c-2e58.ngrok-free.app/",
});

export default api;