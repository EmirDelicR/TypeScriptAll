import axios from "axios";

const HTTP = axios.create({
  baseURL: "https://conduit.productionready.io/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

const setJWT = (jwt: string) => {
  HTTP.defaults.headers.common["Authorization"] = `Token ${jwt}`;
};

const removeJWT = () => {
  delete HTTP.defaults.headers.common["Authorization"];
};

export { HTTP, setJWT, removeJWT };
