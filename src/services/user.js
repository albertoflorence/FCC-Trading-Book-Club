import {api} from './api'

export default {
  updateUser: (property, data) => api.put('users', {property, data})
}
