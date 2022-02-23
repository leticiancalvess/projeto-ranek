import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/ranek/wp-json/api" //url base
}); //cria uma nova instancia de axios

axiosInstance.interceptors.request.use({
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token; //td vez q fizer request coloca o token no headers de autorizacao
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
}); // interceptador ocorre sempre q o axios faz um post, get, put e delete

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
  },
  login(body) {
    return axios.post("http://localhost/ranek/wp-json/jwt-auth/v1/token", body);
  },
  validateToken() {
    return axios.post(
      "http://localhost/ranek/wp-json/jwt-auth/v1/token/validate"
    );
  }
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
