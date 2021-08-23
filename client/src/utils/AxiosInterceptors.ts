import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

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
        .get(`${baseURL}/auth/refresh-token`)
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
