import axios from "axios";

export const apiClientService = axios.create({
  baseURL: "https://planify-backend.vercel.app/",
  // baseURL: "http://localhost:3000/",
});

export default apiClientService;
