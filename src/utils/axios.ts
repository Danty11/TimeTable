import axios from "axios";
export default axios.create({
    baseURL: 'https://be31aa74cbd00e59b5e05282ed363253.serveo.ne/api/',
    headers: {'X-Custom-Header': 'foobar'},
  });