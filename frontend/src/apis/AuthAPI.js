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

const isAuthenticated = () =>
  axiosInstance 
    .request({
      method: 'get',
      url: '/auth/is-authenticated',
    })

const authAPI = { setAuthHeader, register, login, isAuthenticated }

export default authAPI