import { useState } from 'react'

const isErrorsEmpty = errors => {
  for (const [key, value] of Object.entries(errors)) {
    if (value) return false
  }

  return true
} 

const useForm = ({ initialValues, validate, onSubmit }) => {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isErrorsEmpty(errors)) return

    onSubmit()
  }

  const handleChange = async (e) => {
    const {name, value} = e.target

    setValues({
      ...values,
      [name]: value
    })

    setTouched({
      ...touched,
      [name]: false
    })

    const error = await validate[name](value)

    setErrors({
      ...errors,
      [name]: error ? error : null
    })
  }

  const handleBlur = async (e) => {
    const { name } = e.target

    setTouched({
      ...touched,
      [name]: true
    })
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