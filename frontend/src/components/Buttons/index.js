import classNames from 'classnames'
import { FaChevronUp, FaTimes, FaLink } from 'react-icons/fa'

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
        { [style.fullWidth]: fullWidth, [style.disabled]: disabled },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

const IconWrapper = ({ onClick, className, children }) => (
  <span 
    className={classNames(style.iconWrapper, className)}
    onClick={onClick}
  >
    {children}
  </span>
)

export const ChevronIcon = ({ 
    onClick, 
    isOpen, 
    size = '18px',
    colorOpen = 'var(--white)', 
    colorClosed = 'var(--white)', 
}) => (
  <IconWrapper 
    className={style.chevron}
    onClick={onClick}
  >
    <FaChevronUp 
      className={classNames(
        style.chevronIcon,
        { [style.open]: isOpen }
      )}
      size={size}
      style={{ 
        color: (isOpen ? colorOpen : colorClosed)
      }}
    />
  </IconWrapper>
)

export const CloseIcon = ({ 
  onClick,
  size = '18px'
}) => (
  <IconWrapper 
    className={style.close}
    onClick={onClick}
  >
    <FaTimes 
      className={style.closeIcon}
      style={{ fontSize: size }}
    />
  </IconWrapper>
)

export const ToggleSwitch = ({ onClick }) => (
  <label className={style.switch}>
    <input 
      type="checkbox" 
      onClick={onClick} 
    />
    <span className={style.slider}></span>

    <span className={classNames(style.value, style.off)}>Private</span>
    <span className={classNames(style.value, style.on)}>Public</span>
  </label>
)

export const LinkIcon = () => (
  <IconWrapper className={style.link}>
    <FaLink />
  </IconWrapper>
)