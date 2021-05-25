import './index.css'

const Label = ({label, children}) => {
  return (
    <label>
      {label}

      {children}
    </label>
  )
}

export default Label