import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = "http://localhost:5000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    if (error.response.data.message === "jwt expired") {
      return axiosInstance
        .get("http://localhost:5000/api/auth/refresh-token")
        .then(() => {
          return axios(error.config);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
