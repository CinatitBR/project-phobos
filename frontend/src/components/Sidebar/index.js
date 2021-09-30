import IconButton from '../../components/IconButton'
import ProfileDisplay from '../ProfileDisplay'
import SidebarLinkList from '../SidebarLinkList'
import AddDocumentModal from '../AddDocumentModal'

import { FaFileAlt, FaSearch, FaSignOutAlt, FaFolderOpen } from "react-icons/fa"
import useAuth from '../../hooks/useAuth'

import './index.css'

const Sidebar = () => {
  const auth = useAuth()

  const sidebarLinks = [
    {
      name: 'Home', 
      icon: <FaSearch />, 
      to: '/',
    },

    {
      name: 'Explore',
      icon: <FaFolderOpen />,
      to: '/explore'
    }
  ]

  const handleLogout = async () => {
    try {
      await auth.logout()
    }
    catch (errors) {
      console.log(errors)
    }
  }

  return (
    <section id="sidebar">
      <h1 id="logo">Phobos</h1>

      <div id="content">
        <div id="topWrapper">
          <IconButton startIcon={<FaFileAlt size={30} />}>
            Add document
          </IconButton>

          <SidebarLinkList className="links" sidebarLinks={sidebarLinks} />
        </div>

        <div id="bottomWrapper">
          <ProfileDisplay />

          <IconButton 
            id="logoutButton" 
            startIcon={<FaSignOutAlt />}
            onClick={handleLogout}>
            Log out
          </IconButton>
        </div>
      </div>

      <AddDocumentModal />
    </section>
  )
}

export default Sidebar
