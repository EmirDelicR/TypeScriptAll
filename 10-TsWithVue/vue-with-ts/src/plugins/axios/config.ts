import axios from "axios";

const HTTP = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export { HTTP };
