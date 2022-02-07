// api_helper
import axios from "axios";

// localStorage accessToken.
export const authUserKey = "authUser";
export function authHeader() {
  const obj = JSON.parse(localStorage.getItem(authUserKey))

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken }
  } else {
    return {}
  }
}


//apply base url for axios
console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export function setToken() {
  const token = authHeader();
  if (token && token.Authorization) {
    axiosApi.defaults.headers.common["Authorization"] = token.Authorization;
  }
}

export function unsetToken() {
  delete axiosApi.defaults.headers.common["Authorization"];
  localStorage.setItem(authUserKey, undefined);
}

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config });
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config });
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config });
}
