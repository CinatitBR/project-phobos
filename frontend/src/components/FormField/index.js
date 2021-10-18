import classNames from 'classnames'
import style from './style.module.css'

const FormField = ({ 
  label,  
  type,
  touched, 
  error,
  disabled,
  ...props
}) => {
  return (
    <div className={classNames(style.formField, {disabled})}>
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