import classNames from 'classnames'

import style from './style.module.css'

export const Button = ({ 
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