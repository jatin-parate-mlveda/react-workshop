import axios from "axios";

export const apiURL = "http://localhost:3000";

export const postsApiAxios = axios.create({
  baseURL: apiURL + "/posts",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.request.use((config) => {
  console.log(config);

  return config;
});
