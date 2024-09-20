import axios from "axios";

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        console.log("Error sending request");
        Promise.reject(error)
    }
)



export default axios;