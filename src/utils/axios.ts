import axios from "axios";
export default axios.create({
    baseURL: 'https://5877aabeca4a4c4e5dfcfe12f0910558.serveo.net/api/',
    headers: {'X-Custom-Header': 'foobar'},
  });