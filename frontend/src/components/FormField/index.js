import style from './style.module.css'

const FormField = ({ 
  label,  
  type,
  touched, 
  error,
  ...props
}) => {
  return (
    <div className={style.formField}>
      <label>
        {label}

        <input 
          {...props} 
        />

        <span className={style.error}>
          {touched && error}
        </span>
      </label>
    </div>
  )
}

export default FormField