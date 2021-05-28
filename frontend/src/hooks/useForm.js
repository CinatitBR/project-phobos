import { useState } from 'react'
import validate from '../../../shared/src/validate'

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = async (e) => {
    const {name, value} = e.target

    setValues({
      ...values,
      [name]: value
    })

    setTouched({
      ...touched,
      [name]: true
    })
  }

  const handleBlur = async (e) => {
    const { name, value } = e.target

    const error = await validate.register
      .validateOne(name, value)
    
    if (error) {
      setErrors({...errors, ...error})
      return
    }

    setErrors({...errors, [name]: null})
  }

  return { 
    values,
    touched,
    errors,
    handleSubmit, 
    handleChange, 
    handleBlur 
  }
}

export default useForm