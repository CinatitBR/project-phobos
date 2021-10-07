import { useState, useEffect } from 'react'
import authAPI from '../apis/authAPI'

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const register = async ({ email, username, password }) => {
    try {
      await authAPI.register({ email, username, password })
    }
    catch (error) {
      const errors = error.response.data
      
      throw errors
    }
  }

  const login = async ({ email, password }) => {
    try {
      const response = await authAPI.login({ email, password })
      const { accessToken, user } = response.data

      setUser(user)
      authAPI.setAuthHeader(`Bearer ${accessToken}`)
    }
    catch (error) {
      const errors = error.response.data

      throw errors
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()

      setUser(null)
    }
    catch (error) {
      const errors = error.response.data

      throw errors
    }
  }

  const refreshToken = async () => {
    try {
      const response = await authAPI.refreshToken()
      const { accessToken, user } = response.data
  
      setUser(user)
      authAPI.setAuthHeader(`Bearer ${accessToken}`)
    }
    catch (error) {
      setUser(null)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshToken()
  }, [])

  const auth = { 
    user, 
    loading, 
    register, 
    login, 
    logout 
  }
  return auth
}

export default useProvideAuth