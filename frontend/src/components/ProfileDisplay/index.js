import { NavLink } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"

import './index.css'

const ProfileDisplay = () => {
  const auth = useAuth()

  return (
    <NavLink 
      id="profileDisplay" 
      exact 
      to="/account" 
      activeClassName="active"
    >
      <h2>Profile</h2>

      <p id="username">{auth.user.username}</p>
    </NavLink>
  )
}

export default ProfileDisplay
