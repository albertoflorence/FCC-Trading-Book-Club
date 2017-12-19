import axios from 'axios'
// const api = axios.create({
//   baseURL: `http://localhost:8000`
// })
const api = axios.create({
  baseURL: `https://padraoserver.herokuapp.com`
})

api.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, errors => {
  if (errors.response.status === 401) {
    window.location.pathname = '/login'
    return
  }
  return Promise.reject(errors)
})

export {api}
