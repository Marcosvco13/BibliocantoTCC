import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: "https://593c-2804-56c-d746-af00-584d-d71a-540b-d9a4.ngrok-free.app/",
});

export default api;