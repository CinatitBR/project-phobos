import './index.css'

const Button = ({ children, type, ...rest }) => {
  return (
    <button type={type} style={{...rest}}>{children}</button>
  )
}

export default Button