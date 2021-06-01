import { useEffect } from "react"
import { createPortal } from 'react-dom'

const mountPoint = document.querySelector('#react-portal')
const container = document.createElement('div')

const Portal = ({ children }) => {
  useEffect(() => {
    mountPoint.appendChild(container)

    return () => mountPoint.removeChild(container)
  }, [])

  return createPortal(children, container)
}

export default Portal