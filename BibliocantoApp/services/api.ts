import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: "https://592d-2804-56c-c293-9400-3c81-3837-2525-e21a.ngrok-free.app/",
});

export default api;