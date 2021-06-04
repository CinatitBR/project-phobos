import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
})

const register = registerData => 
  axiosInstance
    .post(
      '/auth/register',
      registerData
    )

const login = loginData => 
  axiosInstance
    .post(
      '/auth/login',
      loginData
    )

const AuthAPI = { register, login }

export default AuthAPI