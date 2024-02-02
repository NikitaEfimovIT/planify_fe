import axios from "axios";

export const apiClientService = axios.create({
  baseURL: "https://planify-backend.vercel.app/",
})

export default apiClientService
