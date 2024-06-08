import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, logOut, setLoading } = useAuth();
  const navigate = useNavigate();

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      // console.log("request stopped by interceptor", token);

      return config;
    },
    function (config) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // interceptor 401 $ 403
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error?.response?.status;
      // for 401 & 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
        await logOut();
        setLoading(false);
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
