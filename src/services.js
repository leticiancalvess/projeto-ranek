import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000" //url base 
})//cria uma nova instancia de axios

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  }
};
