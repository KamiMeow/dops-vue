import axios from 'axios';
import store from '@/store';
import router from '@/router';

class WebClient {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 20000,
      withCredentials: true,
    });

    this.setInterceptors();
  }

  setInterceptors() {
    this.axios.interceptors.response.use(null, (error) => {
      if (error.response && error.response.config && error.response.status === 401 || error.response.status === 403) {
        store.dispatch('unsetUserData');
        router.push({ name: 'login' });
        return;
      }
      if (error.response && error.response.config && error.response.status === 400 || error.response.status === 500) {
        store.dispatch('notification/set', {
          type: 'error',
          message: 'Произошла ошибка при выполнении запроса',
        });
        console.log('AJAX error...');
      }
      return Promise.reject(error.response.data);
    });
  }

  get(url, params) {
    return this.axios.get(url, { params });
  }

  post(url, data, params) {
    return this.axios.post(url, data, { params });
  }

  delete(url, params) {
    return this.axios.delete(url, { params });
  }

  put(url, data, params) {
    return this.axios.put(url, data, { params });
  }
}

const url = 'http://localhost:3000';
export default new WebClient(url);
