import axios from 'axios';
// services
import APIService from 'services/APIService';
// endpoints
import {CREATE_USER, AUTH_LOGIN, GET_USER, LOG_OUT} from '../lib/constants/endpoints';
// next router
import Router from 'next/router';

class AuthService extends APIService {
  static create(data = {}): Promise<any> {
    return axios
      .post(CREATE_USER, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static async getUser() {
    return axios
      .get(GET_USER)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  static async login(data) {
    return axios
      .post(AUTH_LOGIN, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  authenticateUser(accessToken: string): void {
    this.setAccessToken(accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    Router.push('/dashboard');
  }

  logout() {
    return axios
      .get(LOG_OUT)
      .then(() => {
        // return response.data;
        this.purgeAuth();
        Router.push('/auth/signin');
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default AuthService;
