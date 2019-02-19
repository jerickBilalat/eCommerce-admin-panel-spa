import axios from 'axios';
import {API_BASE_URL} from '../constants';

export function makeCall({method = "GET", body, endpoint}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const axiosConfig = {
    method: method,
    url,
    data: body,
    headers: {
      'Content-Type': 'application/json', 
    }
  }
  return axios(axiosConfig)
    .then( res => {
      return res
    })
    .catch( err => err);
}
