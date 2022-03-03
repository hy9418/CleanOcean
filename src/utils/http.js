import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.timeout = 6000;
axios.defaults.withCredentials = false;
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "http:";

axios.interceptors.request.use(function(config) {
  config.headers["Authorization"] = Cookies.get("cleanOcean_token");
  return config;
});

axios.interceptors.response.use(
  function(response) {
    return Promise.resolve(response.data);
  },
  function(error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        util.deleteCookie();
        window.location.href = data;
      }

      return Promise.reject({
        ...error.response.data,
        status: error.response.status
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
