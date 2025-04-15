import axios from "axios";

const api = axios.create({
    baseURL: "https://e3ee-2804-56c-d714-3b00-489a-32fe-2db5-f6df.ngrok-free.app/",
});

export default api;