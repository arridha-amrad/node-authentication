import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers!["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.log("err status : ", error.response.status);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    if (error.response.status === 401) {
      return axiosInstance
        .get("/api/auth/refresh-token")
        .then(() => {
          console.log("cookie renewed");
          return axios(error.config);
        })
        .catch((err) => {
          console.log("err from interceptor : ", err.response.data);
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
