// import axios from 'axios';
// // import { removeAuth } from '~helpers/auth';
// //import { baseAPIUrl } from 'src/helpers/common';
// import { defaultConfig } from './config';

// const axiosInt = axios.create({
//   baseURL: defaultConfig.baseAPIUrl + 'api/',
// });

// axiosInt.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error?.response?.status === 401) {
//       // removeAuth();
//       return error?.response?.status;
//     }
//     Promise.reject(
//       (error.response && error.response.data) || 'There is an error!'
//     );
//   }
// );

// export default axiosInt;
