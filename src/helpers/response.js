import {store} from '@/store'
const handleResponse = (from, method) => (result) => {
  if (!result) return null
  store.dispatch('stopLoading', from)
  if (result.msg) {
    store.dispatch('formSuccess', {
      from,
      msg: result.msg
    })
  }
  if (method) {
    store.dispatch(method, result.data || result)
  }
}
export { handleResponse }
