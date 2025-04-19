import axios from 'axios';

const BASE_URLS = {
  user: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:5000',
  payment: process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:5000',
};

const api = {
  user: axios.create({ baseURL: BASE_URLS.user }),
  payment: axios.create({ baseURL: BASE_URLS.payment }),
};

const setAuthToken = (token) => {
  if (token) {
    api.user.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.payment.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.user.defaults.headers.common['Authorization'];
    delete api.payment.defaults.headers.common['Authorization'];
  }
};

export { api, setAuthToken };



// import axios from 'axios';

// const BASE_URLS = {
//   gateway: process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:5001',
// };

// const api = {
//   gateway: axios.create({ baseURL: BASE_URLS.gateway }),
// };

// const setAuthToken = (token) => {
//   if (token) {
//     api.gateway.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.gateway.defaults.headers.common['Authorization'];
//   }
// };

// export { api, setAuthToken };