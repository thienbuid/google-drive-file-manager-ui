import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const TIMEOUT = 15000;

const createAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    timeout: TIMEOUT,
  });

  return axiosInstance;
};

export interface ResponseType<T> {
  status: string;
  message: string;
  errors?: string;
  data: T;
}

export class Request {
  static instance: Request;
  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = createAxios();
  }

  async get<ReturnType>(url: string, options?: AxiosRequestConfig) {
    try {
      const response: ResponseType<ReturnType> = await this.axios.get(
        url,
        options
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async post<BodyType, ReturnType>(
    url: string,
    body: BodyType,
    options?: AxiosRequestConfig
  ) {
    try {
      const response: ResponseType<ReturnType> = await this.axios.post(
        url,
        body,
        options
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  static getInstance() {
    if (Request.instance) {
      return this.instance;
    }
    this.instance = new Request();
    return this.instance;
  }
}
