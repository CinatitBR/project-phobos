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

const AuthAPI = { register }

export default AuthAPI