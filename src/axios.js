import axios from "axios";
import router from "./router";

const api = axios.create({
    baseURL: "http://192.168.2.1:8080/api/",
    withCredentials: true,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401){
            router.push('/login-auth.html');
        }
        return Promise.reject(error);
    }
)

export default api;