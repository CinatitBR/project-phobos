import Title from '../Title'

import './index.css'

const Modal = () => {
  return (
    <div className="overlay">

      <div className="modal">
        <Title>Account created</Title>
        <Title>successfully!</Title>
      </div>

    </div>
  )
}

export default Modal