import axios from "axios";

//開発時： "http://localhost:3000/api/v1"
//デプロイ時: endpointまでのパスで良いので "/api/v1"

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: "/api/v1",
});

export default axiosClient;
