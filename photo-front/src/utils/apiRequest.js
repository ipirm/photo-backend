import axios from 'axios'

function headers() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  }
}

function headersFormData() {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  }
}

const request = (callback) => {
  return new Promise((resolve, reject) => {
    callback
      .then(data => resolve(data))
      .catch(e => reject(handleError(e)));
  })
}

const handleError = (e) => {
  if (!e.response) return { _e: 'Unknown Error' };
  return e;
}

export default class apiRequest {
  static get(path) {
    return request(axios.get(`${process.env.VUE_APP_API_URL}/${path}`, headers()));
  }

  static post(path, data) {
    return request(axios.post(`${process.env.VUE_APP_API_URL}/${path}`, data, headers()));
  }

  static delete(path) {
    return request(axios.delete(`${process.env.VUE_APP_API_URL}/${path}`, headers()));
  }

  static postFormData(path,data) {
    return request(axios.post(`${process.env.VUE_APP_API_URL}/${path}`, data, headersFormData()));
  }
}
