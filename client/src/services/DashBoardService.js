import Cookies from "js-cookie";
import axios from 'axios';
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL+"/dashboard"
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


async function fetchData(endpoint, options = {}) {
    try {
     const response = await api.get(endpoint, options);
        return response
    } catch (error) {
      console.error( error);
      throw error;
    }
  }

  export async function getDashBoard(){
    return await fetchData("/")
}