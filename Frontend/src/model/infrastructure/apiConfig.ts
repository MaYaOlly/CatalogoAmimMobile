import axios, { AxiosInstance } from "axios";

/**
 * Configuração centralizada da API
 * Todas as requisições HTTP devem usar esta instância
 */
const API_BASE_URL = "http://3.238.68.120:3333";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
