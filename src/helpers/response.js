import {store} from '@/store'
const handleResponse = (from, method) => (result) => {
  console.log(from)
  console.log(method)
  console.log(result)
  if (!result) return null
  store.dispatch('stopLoading', from)
  if (result.message) {
    store.dispatch('messageSuccess', {
      from,
      message: result.message
    })
  }
  if (method) {
    store.dispatch(method, result.data || result)
  }
}
export { handleResponse }
