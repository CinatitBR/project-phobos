import IconButton from "../../components/IconButton"
import ProfileDisplay from "../ProfileDisplay"
import { Link } from "react-router-dom"
import { FaFileAlt, FaSearch, FaSignOutAlt } from "react-icons/fa"

import "./index.css"

const Sidebar = () => {
  return (
    <section id="sidebar">
      <h1 id="logo">Phobos</h1>

      <div id="content">
        <div id="topWrapper">
          <IconButton startIcon={<FaFileAlt size={30} />}>
            Add document
          </IconButton>

          <nav id="links">
            <Link className="sidebarLink" to="#">
              <FaSearch /> Home
            </Link>
          </nav>
        </div>

        <div id="bottomWrapper">
          <ProfileDisplay />

          <IconButton id="logoutButton" startIcon={<FaSignOutAlt />}>
            Log out
          </IconButton>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
