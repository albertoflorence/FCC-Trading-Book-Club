import {api} from './api'

export default {
  get: data => api.get('/books', {params: data}),
  register: data => api.post('/books/register', data),
  getById: id => api.get(`books/${id}`),
  getMatchUsers: id => api.get(`books/match/users/${id}`)
}
