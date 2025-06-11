import axios from 'axios';
// services
import APIService from 'services/APIService';
// endpoints
import {FILINGS, MEDIA} from 'lib/constants/endpoints';

class FilingService extends APIService {
  create(data: any): Promise<any> {
    return axios
      .post(FILINGS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response;
      });
  }

  upload(data: any): Promise<any> {
    return axios
      .post(MEDIA, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response;
      });
  }
}

export default FilingService;
