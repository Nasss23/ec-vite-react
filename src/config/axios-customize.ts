import { Mutex } from 'async-mutex'
import axiosClient from 'axios'
import { store } from '../redux/store'
import { setRefreshTokenAction } from '../redux/auth/account.slice'

const instance = axiosClient.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL as string,
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

const mutex = new Mutex()
const NO_RETRY_HEADER = 'x-no-retry'

const handleRefreshToken = async (): Promise<string | null> => {
  return await mutex.runExclusive(async () => {
    const res = await instance.get('/api/v1/auth/refresh')
    // console.log('handleRefreshToken', res);
    if (res && res.data) {
      return res.data
    } else return null
  })
}

instance.interceptors.request.use(function (config) {
  if (typeof window !== 'undefined' && window && window.localStorage && window.localStorage.getItem('access_token')) {
    // console.log('window.localStorage ', window.localStorage);
    // console.log(
    // 	"window.localStorage.getItem('access_token')",
    // 	window.localStorage.getItem('access_token'),
    // );
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token')
  }
  if (!config.headers.Accept && config.headers['Content-Type']) {
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
  }
  return config
})

instance.interceptors.response.use(
  async (res) => {
    // console.log('res: ', res);
    if (res) {
      return res.data
    }
  },
  async (error) => {
    console.log('error line 58: ', error)
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      error.config.url !== '/api/v1/auth/login' &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken()
      console.log('access_token line 66: ', access_token)
      error.config.headers[NO_RETRY_HEADER] = 'true'
      if (access_token) {
        error.config.headers['Authorization'] = `Bearer ${access_token}`
        localStorage.setItem('access_token', access_token)
        return instance.request(error.config)
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === '/api/v1/auth/refresh'
      // &&
      // location.pathname.startsWith('/admin')
    ) {
      const message = error?.response?.data?.message ?? 'Có lỗi xảy ra, vui lòng login.'
      //dispatch redux action
      store.dispatch(setRefreshTokenAction({ status: true, message }))
    }

    return error?.response?.data ?? Promise.reject(error)
  }
)

export default instance
