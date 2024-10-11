import axios from "axios";
export default axios.create({
    baseURL: 'https://k80sowk80c808s4cogk0woc0.158.220.126.158.sslip.io/api/',
    headers: {'X-Custom-Header': 'foobar'},
  });