import axios from "axios";
const baseURL = "https://react-the-burger-builder-b45d4.firebaseio.com/";
// const authSecretKey = "/?auth=TGS3sr5gbBmZ2FzcBzqZnEOqdVXtYkUqRl1Kc04a";
const axiosInstance = axios.create({
  baseURL: baseURL
});
axiosInstance.interceptors.request.use(
  config => {
    // config.url += authSecretKey;
    return config;
  },
  error => Promise.reject(error)
);
export default axiosInstance;