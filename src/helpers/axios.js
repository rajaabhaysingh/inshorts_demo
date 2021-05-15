import axios from "axios";

const token = localStorage.getItem("token");

const axiosIntance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: "https://inshorts-news.vercel.app",
  baseURL: "https://609f39ebc512c20017dccf0c.mockapi.io",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);

    return Promise.reject(error);
  }
);

export default axiosIntance;
