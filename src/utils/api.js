import axios from "axios";

export const JPH_API = axios.create({
  baseURL: process.env.REACT_APP_JPH_API,
});
