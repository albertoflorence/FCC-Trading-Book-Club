import {api} from './api'

const setAuthHeader = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
const handleSignUser = (data) => {
  const {user, token} = data
  if (token) {
    localStorage.setItem('authentication:authUser', JSON.stringify({token}))
    setAuthHeader(token)
  }
  return user
}

const autoSignIn = async () => {
  try {
    const data = JSON.parse(localStorage.getItem('authentication:authUser'))
    if (data) {
      const {token} = data
      if (token) {
        return await signInWithToken({token})
      }
    }
  } catch (err) {
    Promise.reject(err)
  }
}

const signOut = () => {
  setAuthHeader(null)
  localStorage.removeItem('authentication:authUser')
  return Promise.resolve()
}

const signInWithToken = (token) => api.post('auth/signin/token', token).then(handleSignUser)

export default {
  signIn: data => api.post('auth/signin', data).then(handleSignUser),
  signUp: data => api.post('auth/signup', data).then(handleSignUser),
  getSignInUrl: (social) => api.get(`auth/url/${social}`),
  signInWithGoogle: (code) => api.post('auth/signin/google', {code}).then(handleSignUser),
  signInWithToken,
  autoSignIn,
  signOut
}
