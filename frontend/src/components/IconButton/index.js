import classNames from 'classnames'
import { Button } from '../Buttons'

import './index.css'

const IconButton = ({ 
  children, 
  startIcon, 
  finalIcon,
  className,
  ...rest 
}) => {
  const classNameAttribute = classNames(
    'iconButton',
    className
  )

  return (
    <Button className={classNameAttribute} {...rest}>
      {startIcon && startIcon}

      {children}

      {finalIcon && finalIcon}
    </Button>
  )
}

export default IconButton