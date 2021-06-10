import { NavLink } from 'react-router-dom'

import './index.css'

function SidebarLink({ icon, name, to, ...rest }) {
  return (
    <NavLink 
      className="sidebarLink" 
      exact
      to={to}
      activeClassName="active"
      {...rest}>
      {icon} {name}
    </NavLink>
  )
}

export default SidebarLink
