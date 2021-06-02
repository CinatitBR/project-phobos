import './index.css'

const Button = ({ children, ...rest }) => {
  return (
    <button {...rest}>{children}</button>
  )
}

export default Button