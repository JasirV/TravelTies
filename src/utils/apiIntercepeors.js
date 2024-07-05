import axios from "axios";
let baseUrl = import.meta.env.VITE_BASE_URL
console.log(baseUrl);
const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers["authorization"] = `${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error); 
  }
);
api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  export default api
