import axios from 'axios';
// services
import APIService from 'services/APIService';
// endpoints
import {COMPANIES, SEARCH} from 'lib/constants/endpoints';

class CompanyService extends APIService {
  create(data: any): Promise<any> {
    return axios
      .post(COMPANIES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response;
      });
  }

  search(url): Promise<any> {
    return axios
      .get(SEARCH(url))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response;
      });
  }
}

export default CompanyService;
