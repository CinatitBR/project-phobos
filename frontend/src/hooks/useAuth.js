import { useState, useEffect, useContext, createContext } from 'react'
import authAPI from '../apis/authAPI'

const authContext = createContext()

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

      authAPI.setAuthHeader(`Bearer ${accessToken}`)
      setUser(user)
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

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
const useAuth = () => {
  return useContext(authContext);
}

// Provider component that wraps the app and makes auth object ...
// ... available to any child component that calls useAuth().
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      {auth.loading ? null : children}
    </authContext.Provider>
  )
}

export { ProvideAuth }
export default useAuth