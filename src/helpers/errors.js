import {store} from '@/store'

const handle404 = ({from, data}) => {
  store.dispatch('messageError', {
    message: data.message || data.message || data,
    from
  })
}

const handle400 = ({from, data}) => {
  store.dispatch('messageError', {
    message: data.message || data.message || data,
    from
  })
}

const handleDefault = ({from, data}) => {
  store.dispatch('messageError', {
    message: data.message || data.message || data,
    from
  })
}

const handleErrors = (from) => ({response}) => {
  if (!response.status) return
  const params = {
    data: response.data,
    from
  }
  switch (response.status) {
    case 404:
      handle404(params)
      break
    case 400:
      handle400(params)
      break
    default:
      handleDefault(params)
  }
  store.dispatch('stopLoading', from)
}
export { handleErrors }
