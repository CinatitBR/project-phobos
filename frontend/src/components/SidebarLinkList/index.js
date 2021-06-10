import SidebarLink from '../SidebarLink'

import './index.css'

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
