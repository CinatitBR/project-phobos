import classNames from 'classnames'

import './index.css'

const Button = ({ 
  children, 
  fullWidth, 
  disabled,
  className, 
  ...rest 
}) => {
  const classNameAttribute = classNames(
    { fullWidth, disabled },
    className
  )

  return (
    <button 
      disabled
      className={classNameAttribute}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button