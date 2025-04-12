import axios from "axios";

const api = axios.create({
    baseURL: "https://3526-2804-56c-d714-3b00-8574-f7a1-497b-7b20.ngrok-free.app/",
});

export default api;