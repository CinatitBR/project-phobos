import Title from '../Title'
import IconButton from '../IconButton'
import { FaSignInAlt } from 'react-icons/fa'

import './index.css'

const Modal = () => {
  return (
    <div className="overlay">

      <div className="modal">
        <header>
          <Title>Account created</Title>
          <Title>successfully!</Title>
        </header>
        
        <IconButton 
          finalIcon={<FaSignInAlt />}
        >
          Testando
        </IconButton>
      </div>

    </div>
  )
}

export default Modal