import { jwtToken } from '@/api/dataService'
import axios from 'axios'

const service = axios.create({
  baseURL:
    import.meta.env.MODE == 'development'
      ? '/api'
      : import.meta.env.VITE_BASE_API, // api 的 base_url
  timeout: 50000, // request timeout
})

service.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error) // for debug
    if (error.status == 401) {
      jwtToken()
    }
    return error.response //Promise.reject(error)
  },
)

export default service
