import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
})

const setAuthHeader = value => 
  axiosInstance
    .defaults
    .headers
    .common['Authorization'] = value 

// auth
const register = ({ email, username, password }) => 
  axiosInstance
    .request({
      method: 'post',
      url: '/auth/register',
      data: { email, username, password }
    })

const login = ({ email, password }) => 
  axiosInstance
    .request({
      method: 'post',
      url: '/auth/login',
      data: { email, password }
    })

const logout = () => 
  axiosInstance
    .request({
      method: 'get',
      url: '/auth/logout'
    })

const refreshToken = () => 
  axiosInstance
    .request({
      method: 'get',
      url: '/auth/refresh-token',
    })


// pdf
const search = keyword => 
  axiosInstance
    .request({
      method: 'post',
      url: '/pdf/search',
      data: { keyword }
    })

const findAll = userId =>
    axiosInstance.post('/pdf/find-all', { userId })

const uploadFile = (data, updateProgress) => 
  axiosInstance.post('/pdf/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: progressEvent => {
      const progress = Math.round((100 * progressEvent.loaded) / progressEvent.total)

      updateProgress(progress)
    }
  })

const destroy = pdfId => 
  axiosInstance.post('/pdf/delete', { pdfId })

const findAllTag = userId =>
  axiosInstance.post('/pdf/find-all-tag', { userId })

const findTagById = tagId => 
  axiosInstance.post('/pdf/find-tag-by-id', { tagId })

const findPublic = page =>
  axiosInstance.get(`/pdf/find-public/?page=${page}`)

const stars = (action, pdfId, userId) =>
  axiosInstance.post('/pdf/stars', { action, pdfId, userId })

// Response interceptor to handle expired access tokens
axiosInstance.interceptors.response.use(undefined, async (error) => {
  // Return any error which is not due to authentication
  if (error.response.status !== 401) {
    throw error
  }

  const requestUrl = error.config.url
  const requestMethod = error.config.method

  // Log out user if token refresh didn't work
  if (requestUrl === '/auth/refresh-token') {
    throw new Error('Log out')
  }

  // Get new access token and set authorization header
  const { accessToken } = await refreshToken()
  setAuthHeader(`Bearer ${accessToken}`)

  // Retry request using new auth header
  return axiosInstance({
    method: requestMethod,
    url: requestUrl
  })
})

const authAPI = { 
  setAuthHeader, 
  register, 
  login, 
  logout,
  refreshToken,
  search,
  findAll,
  uploadFile,
  destroy,
  findAllTag,
  findTagById,
  findPublic,
  stars
}

export default authAPI