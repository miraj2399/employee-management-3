import axios from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL+"/revenueRecords"
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }
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

export async function getAllRevenueRecords(){
    return await fetchData("/")
}

export async function getRevenueRecordById(id){
    return await fetchData(`/${id}`)
}

export async function createRevenueRecord(revenueRecord){
    return await api.post("/",revenueRecord)
}

export async function updateRevenueRecord(id,revenueRecord){
    return await api.put(`/${id}`,revenueRecord)
}

export async function deleteRevenueRecordById(id){
    return await api.delete(`/${id}`)
}

export async function deleteRevenueRecords(revenueRecords){
    return await api.delete("/",revenueRecords)
}

export async function getLatestRevenueRecordsByDays(days){
    return await fetchData(`/latest/${days}`)
}


