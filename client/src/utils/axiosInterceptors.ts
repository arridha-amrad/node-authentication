import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAcessToken, setAccessToken } from "../setAccessToken";

const baseURL = "http://localhost:8080/api/";

let headers: any = {
  "Content-Type": "application/json"
};

if (getAcessToken()) {
  headers.Authorization = getAcessToken();
}

// console.log("Access Token from axiosInterceptor : ", getAcessToken());

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAcessToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
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
    if (error.response.status === 403) {
      return axios
        .post("http://localhost:8080/api/auth/refresh-token", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }) // Endpoint to request new token
        .then((res) => {
          setAccessToken(res.data.success.accessToken);
          axios.defaults.headers.common["Authorization"] = getAcessToken();
          return axios(error.config);
        });
      // .catch((err) => {
      //   console.log(err);
      // });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
