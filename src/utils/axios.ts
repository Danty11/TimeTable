import axios from "axios";
export default axios.create({
    baseURL: 'https://d63d5380fcf15cf7ea6cce0e6f5cc620.serveo.net/api/',
    headers: {'X-Custom-Header': 'foobar'},
  });