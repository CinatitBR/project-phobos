import useAuth from "../../hooks/useAuth"

import "./index.css"

const ProfileDisplay = () => {
  const auth = useAuth()

  return (
    <article id="profileDisplay">
      <h2>Profile</h2>

      <p id="username">{auth.user.username}</p>
    </article>
  )
}

export default ProfileDisplay
