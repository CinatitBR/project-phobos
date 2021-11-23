import { useState } from 'react'
import IconButton from '../../components/IconButton'
import ProfileDisplay from '../ProfileDisplay'
import SidebarLinkList from '../SidebarLinkList'
import AddDocumentModal from '../AddDocumentModal'
import { FaFileAlt, FaSearch, FaSignOutAlt, FaFolderOpen } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'

import './index.css'

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false)
  const auth = useAuth()

  const sidebarLinks = [
    {
      name: 'Home', 
      icon: <FaSearch />, 
      to: '/',
    },
    {
      name: 'Library',
      icon: <FaFolderOpen />,
      to: '/library'
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

  const toggleModal = () => setShowModal(!showModal)

  return (
    <section id="sidebar">
      <h1 id="logo">Phobos</h1>

      <div id="content">
        <div id="topWrapper">
          <IconButton 
            startIcon={<FaFileAlt size={30} />} 
            onClick={toggleModal}
          >
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

      <AddDocumentModal show={showModal} onClose={toggleModal} />
    </section>
  )
}

export default Sidebar
