import axios from 'axios';
import {API_BASE_URL} from '../constants';
import AuthUtils from '../utils/authUtils'


const api = axios.create({
  baseURL: API_BASE_URL
})

export function makeCall({method = "GET", body, endpoint}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const axiosConfig = {
    method: method,
    url,
    data: body,
    headers: {
      'Content-Type': 'application/json', 'x-auth-token': `${AuthUtils.getToken()}`
    }
  }
  return axios(axiosConfig)
    .then( res => {
      return res
    })
    .catch( err => err);
}


// AUTH
export function login(credentials) {
  return api
    .post('/api/auth/signin', credentials)
    .then( res => {
      AuthUtils.setToken(res.data.token)
      return AuthUtils.getUser(res.data.token)
    })
}

export function register(credentials) {
  return api
    .post('/api/auth/signup', credentials)
    .then( res => {
      AuthUtils.setToken(res.data.token)
      return AuthUtils.getUser(res.data.token)
    })
}
