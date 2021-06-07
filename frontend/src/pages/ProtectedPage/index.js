import useAuth from '../../hooks/useAuth'

const ProtectedPage = () => {
  const auth = useAuth()
  
  return (
    <>
      <h1>Hello, {auth.user.username}, this is a protected page</h1>
      <h2>You should only see this if you are logged in</h2>
    </>
  )
}

export default ProtectedPage