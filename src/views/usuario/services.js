import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000" //url base
}); //cria uma nova instancia de axios

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body); //sendo o body um objeto que será transformado em json e postado na api pelo axios
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  }
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
