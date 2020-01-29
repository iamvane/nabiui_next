import axios from "axios";

<<<<<<< HEAD
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'https://nabiapistaging.herokuapp.com';
=======
axios.defaults.baseURL = 'https://nabiapistaging.herokuapp.com/';
>>>>>>> 196458d... added axios base url
