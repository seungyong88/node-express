import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types"; 

export async function loginUser(dataToSubmit){

  const res = await axios.post('/api/users/login', dataToSubmit);

  return {
    type: LOGIN_USER,
    payload: res.data,
  }
}

export async function registerUser(dataToSubmit){

  const res = await axios.post('/api/users/register', dataToSubmit);
  
  return {
    type: REGISTER_USER,
    payload: res.data,
  }
}

export async function auth(){

  const res = await axios.get('/api/users/auth');
  
  return {
    type: AUTH_USER,
    payload: res.data,
  }
}