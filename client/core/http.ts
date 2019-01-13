import axios from 'axios';

const http = axios.create();

http.interceptors.request.use(function (config) {
  config.withCredentials = true;
  config.xsrfCookieName = 'YTLite';
  config.xsrfHeaderName = 'Authorization';
  return config;
});

export default http;
