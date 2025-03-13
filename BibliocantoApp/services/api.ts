import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: "https://aae2-2804-56c-c258-e000-9440-8d06-291c-9c19.ngrok-free.app/",
});

export default api;