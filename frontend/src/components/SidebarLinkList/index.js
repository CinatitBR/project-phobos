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

function SidebarLinkList({ sidebarLinks, ...rest }) {
  return (
    <nav id="sidebarLinkList" {...rest}>
      {sidebarLinks.map(({ name, icon, to }, index) =>
        <SidebarLink key={index} icon={icon} name={name} to={to} />
      )}
    </nav>
  )
}

export default SidebarLinkList
