import axios from 'axios';


export const createApi = () => axios.create({
  baseURL: 'https://guitar-shop.accelerator.pages.academy/',
  timeout: 5000,
  withCredentials: true,
});
