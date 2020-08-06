import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://conduit.productionready.io/api";
//const API_ROOT = 'http://localhost:5000/api';

const encode = encodeURIComponent;
const successResponse = (res) => {
  return {
    status: res.status,
    data: res.body,
  };
};
const errorResponse = (err) => {
  return {
    status: err.status,
    errors: err.response.body,
  };
};

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const requests = {
  del: (url) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(successResponse, errorResponse),
  get: (url) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(successResponse, errorResponse),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(successResponse, errorResponse),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(successResponse, errorResponse),
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
