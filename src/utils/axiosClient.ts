import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'https://nabiapistaging.herokuapp.com';
