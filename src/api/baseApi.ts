import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from '../config/env';

export class BaseApi {
  protected client: AxiosInstance;

  constructor(baseURL: string = API_URL) {
    this.client = axios.create({ baseURL });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  // Add put, delete, etc. as needed
} 