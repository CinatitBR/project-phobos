import { createPortal } from 'react-dom'

const mountPoint = document.querySelector('#react-portal')

const Portal = ({ children }) => {
  return createPortal(children, mountPoint)
}

export default Portal