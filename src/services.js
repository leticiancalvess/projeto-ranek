import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000" //url base
}); //cria uma nova instancia de axios

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  }
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json`);
}
