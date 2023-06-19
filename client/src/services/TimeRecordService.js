import axios from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL+"/timeRecords"
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

export async function getAllTimeRecords(){
    return await fetchData("/")
}

export async function getLatestTimeRecordsByDays(days){
    return await fetchData(`/latest/${days}`)
}

export async function searchTimeRecords(startDate,endDate){
    return await fetchData(`/search/${startDate}/${endDate}`)
}

export async function createTimeRecord(timeRecord){
    return await api.post("/",timeRecord)
}

export async function updateTimeRecord(id,timeRecord){
    return await api.put(`/${id}`,timeRecord)
}

export async function deleteTimeRecordById(id){
    return await api.delete(`/${id}`)
}

export async function deleteTimeRecords(timeRecords){
    return await api.delete("/",timeRecords)
}
