import axios from "axios";
export default axios.create({
    baseURL: 'https://340406d7fb25a031fbdf963775b670a0.serveo.net/api/',
    headers: {'X-Custom-Header': 'foobar'},
  });