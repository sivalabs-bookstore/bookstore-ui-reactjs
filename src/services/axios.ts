import axios from "axios";
//import * as config from '../config/config'

const axiosInstance = axios.create();
/*
const configApiUrl = config.default.REACT_APP_API_BASE_URL;
console.log("localApiUrl from config: " + configApiUrl);
let apiUrl = process.env.REACT_APP_API_BASE_URL;
console.log("REACT_APP_API_BASE_URL from env: " + apiUrl);
apiUrl = apiUrl || configApiUrl;
console.log("Effective REACT_APP_API_BASE_URL from env: " + apiUrl);
axiosInstance.defaults.baseURL = apiUrl;
*/

export default axiosInstance;
