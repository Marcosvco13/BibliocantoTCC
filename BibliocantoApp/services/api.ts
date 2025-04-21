import axios from "axios";

const api = axios.create({
    baseURL: "https://2daa-132-255-111-253.ngrok-free.app/",
});

export default api;