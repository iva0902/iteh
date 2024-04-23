import axios from "axios";

let token = window.sessionStorage.getItem('token');
let instance = null;
if (token){
    instance = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        timeout: 30000,
    });
}else{
    instance = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 30000,
    });
}

export default instance;