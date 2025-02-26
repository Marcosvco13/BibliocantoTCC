import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: "https://00d7-132-255-111-253.ngrok-free.app/",
});

export default api;