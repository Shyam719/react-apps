import axios from "axios";

const API_ROOT = "https://conduit.productionready.io/api";
//const API_ROOT = 'http://localhost:5000/api';

const encode = encodeURIComponent;
const successResponse = (res) => {
  return {
    status: res.status,
    data: res.data,
  };
};
const errorResponse = (err) => {
  return {
    status: err.status,
    errors: err.response ? err.response.data : err,
  };
};

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.headers.Authorization = `Token ${token}`;
  }
  return req;
};

axios.interceptors.request.use(tokenPlugin);

const requests = {
  del: (url) =>
    axios.del(`${API_ROOT}${url}`).then(successResponse, errorResponse),
  get: (url) =>
    axios.get(`${API_ROOT}${url}`).then(successResponse, errorResponse),
  post: (url, body) =>
    axios.post(`${API_ROOT}${url}`, body).then(successResponse, errorResponse),
  put: (url, body) =>
    axios.put(`${API_ROOT}${url}`, body).then(successResponse, errorResponse),
};

const Auth = {
  user: () => requests.get("/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (email, password, username) =>
    requests.post("/users", { user: { username, email, password } }),
};

const Articles = {
  all: () => requests.get("/articles"),
  feed: () => requests.get("/articles/feed"),
  byTag: (tag) => requests.get(`/articles?tag=${encode(tag)}`),
};

const Tags = {
  all: () => requests.get("/tags"),
};

export default {
  Auth,
  Articles,
  Tags,
  setToken: (_token) => {
    token = _token;
  },
};
