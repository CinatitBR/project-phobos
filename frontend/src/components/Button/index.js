import classNames from 'classnames'

import './index.css'

const Button = ({ children, fullWidth, className, ...rest }) => {
  const classNameAttribute = classNames(
    { fullWidth },
    className
  )

  return (
    <button 
      className={classNameAttribute}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button