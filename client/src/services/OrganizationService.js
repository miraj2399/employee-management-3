import axios from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL+"/organizations"
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

export async function createOrganization(organization){
    return await api.post("/",organization)
}

export async function getOrganizationByName(name){
    return await fetchData(`/${name}`)
}

export async function getAvailablePermissions(){
    return await fetchData("/permissions")
}

export async function updatePermissions(permissions){
    return await api.post("/permissions",permissions)
}

export async function requestJoinOrganization(organization){
    return await api.post("/join",organization)
}

export async function getAllJoinRequests(){
    return await fetchData("/join")
}

export async function approveJoinRequest(request){
    return await api.put("/approve",request)
}


