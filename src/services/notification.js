import {api} from './api'

export default {
  get: () => api.get(`/notifications`),
  seen: (id) => api.put(`/notifications/${id}`, {seen: true}),
  delete: (id) => api.delete(`/notifications/${id}`)
}
