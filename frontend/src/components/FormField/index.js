import './index.css'

const FormField = ({ 
  label, 
  type, 
  value, 
  onChange, 
  onBlur,
  name, 
  touched, 
  error 
}) => {
  return (
    <div id="formField">
      <label>
        {label}

        <input 
          type={type} 
          value={value} 
          name={name} 
          onChange={onChange}
          onBlur={onBlur} 
        />
        <span id="error">{touched && error}</span>
      </label>
    </div>
  )
}

export default FormField