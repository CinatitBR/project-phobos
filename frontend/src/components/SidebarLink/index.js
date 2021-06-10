import { Link } from 'react-router-dom'

import './index.css'

function SidebarLink({ icon, name, to, ...rest }) {
  return (
    <Link 
      className="sidebarLink" 
      to={to}
      {...rest}>
      {icon} {name}
    </Link>
  )
}

export default SidebarLink
