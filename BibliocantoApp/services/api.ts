import axios from "axios";

const api = axios.create({
    baseURL: "https://256e-2804-56c-c238-3b00-79c4-27db-6ef1-71fb.ngrok-free.app" + "/",
});

export default api;