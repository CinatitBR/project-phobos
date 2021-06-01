import FormTitle from '../FormTitle'

import './index.css'

const Modal = () => {
  return (
    <div className="overlay">

      <div className="modal">
        <FormTitle>Account created</FormTitle>
        <FormTitle>successfully!</FormTitle>
      </div>

    </div>
  )
}

export default Modal