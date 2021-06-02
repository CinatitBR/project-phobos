import Button from '../Button'

import './index.css'

const IconButton = ({ 
  children, 
  startIcon, 
  finalIcon,
  ...rest 
}) => {
  return (
    <Button className="iconButton" {...rest}>
      {startIcon && startIcon}

      {children}

      {finalIcon && finalIcon}
    </Button>
  )
}

export default IconButton