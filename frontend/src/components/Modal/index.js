import { useHistory } from 'react-router-dom'
import Title from '../Title'
import IconButton from '../IconButton'
import { FaSignInAlt, FaTimes } from 'react-icons/fa'

import './index.css'

const Modal = ({ show, onClose }) => {
  const history = useHistory()

  if (!show) return null

  return (
    <div className="overlay" onClick={onClose}>

      <div className="modal">
        <FaTimes 
          className="closeButton" 
          size="25px" 
          onClick={onClose}
        />

        <div className="wrapper">
          <header>
            <Title>Account created</Title>
            <Title>successfully!</Title>
          </header>

          <IconButton 
            onClick={() => history.push('/login')}
            finalIcon={<FaSignInAlt />}>
            Log in to account
          </IconButton>
        </div>

      </div>

    </div>
  )
}

export default Modal