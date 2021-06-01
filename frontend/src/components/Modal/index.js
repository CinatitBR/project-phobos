import Title from '../Title'

import './index.css'

const Modal = () => {
  return (
    <div className="overlay">

      <div className="modal">
        <header>
          <Title>Account created</Title>
          <Title>successfully!</Title>
        </header>
      </div>

    </div>
  )
}

export default Modal