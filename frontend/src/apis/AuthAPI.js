import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

const setAuthHeader = value => 
  axiosInstance
    .defaults
    .headers
    .common['Authorization'] = value 

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

const refreshToken = () => 
  axiosInstance
    .request({
      method: 'get',
      url: '/auth/refresh-token',
    })

const authAPI = { setAuthHeader, register, login, refreshToken }

export default authAPI