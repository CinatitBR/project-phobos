import { useContext, createContext } from "react"
import useProvideAuth from './useProvideAuth'

const authContext = createContext()

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