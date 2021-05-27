import './index.css'
import { Link } from 'react-router-dom'

const FormLink = ({ href, children }) => {
  return (
    <Link id="formLink" to={href}>{children}</Link>
  )
}

export default FormLink