import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const instance: AxiosInstance = axios.create();

instance.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://greenbutterfly.io/api"
    : "/api";

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /*  const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json"; */

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default instance;
