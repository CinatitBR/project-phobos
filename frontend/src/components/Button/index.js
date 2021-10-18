import classNames from 'classnames'

import './index.css'

const Button = ({ 
  children, 
  fullWidth, 
  disabled,
  className, 
  ...rest 
}) => {
  return (
    <button 
      disabled={disabled}
      className={classNames(
        { fullWidth, disabled },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button