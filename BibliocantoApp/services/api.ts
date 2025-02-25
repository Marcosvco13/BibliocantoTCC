import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: "https://be96-2804-56c-d746-af00-5d00-c4b4-8df-2969.ngrok-free.app/",
});

export default api;