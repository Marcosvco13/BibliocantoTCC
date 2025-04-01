import axios from "axios";

const api = axios.create({
    baseURL: "https://436d-2804-56c-d7df-b500-6947-c2c1-5dbf-8959.ngrok-free.app/",
});

export default api;