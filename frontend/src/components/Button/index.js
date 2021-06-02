import './index.css'

const Button = ({ children, fullWidth, ...rest }) => {
  const className = fullWidth 
    ? {className: 'fullWidth'}
    : undefined

  return (
    <button {...className} {...rest}>
      {children}
    </button>
  )
}

export default Button