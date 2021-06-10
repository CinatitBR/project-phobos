import { Link } from 'react-router-dom'

import './index.css'

function SidebarLink({ icon, name, to }) {
  return (
    <Link 
      className="sidebarLink" 
      to={to}>
      {icon} {name}
    </Link>
  )
}

export default SidebarLink
