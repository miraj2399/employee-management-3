

import Cookies from "js-cookie";
import axios from 'axios';
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL+"/employees"
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
// include cookies in the request
export async function getAllEmployees(){
    return await fetchData("/")
}

export async function getEmployeeById(id){
    return await fetchData(`/${id}`)
}

export async function createEmployee(employee){
    return await api.post("/",employee)
}

export async function updateEmployee(id,employee){
    return await api.put(`/${id}`,employee)
}

export async function deleteEmployeeById(id){
    return await api.delete(`/${id}`)
}

export async function deleteEmployees(employees){
    console.log("deleteEmployees: ",{data:employees})
    return await api.delete("/",
    {data:employees})
    
}


