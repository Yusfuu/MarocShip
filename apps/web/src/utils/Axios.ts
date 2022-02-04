import axios from "axios";

export const Axios = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_ENDPOINT,
    headers: {
        "Content-type": "application/json",
    },
});
