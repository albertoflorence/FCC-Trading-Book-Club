import {api} from './api'

export default {
  create: (data) => api.post('trades', data),
  getOne: (id) => api.get(`trades:${id}`),
  get: (query) => api.get('trades', {params: query})
}
