import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.response.use(
    (response) => {
        const newToken = response.data.token;
      if (newToken) {
        Cookies.set('token', newToken);
      }
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log('Unauthorized');
      }
      return Promise.reject(error);
    }
  );

  export async function loginUser(username, password) {
    try {
      const response = await api.post("/users/login", { username: username, password: password });
      Cookies.set('token',response.data.token);
        return response
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  

export async function signupUser(username,password){
    try{
        const response = await api.post("/users/signup",{username,password})
        return response
    }
    catch(err){
        console.log(err)
        throw err
    }
}


