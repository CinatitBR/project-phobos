import { useState } from 'react'

const isObjectEmpty = object => {
  for (const value of Object.values(object)) {
    if (value) return false
  }

  return true
} 

const touchAllFields = values => {
  const newTouched = {}

  for (const key of Object.keys(values)) {
    newTouched[key] = true
  }

  return newTouched
}

const useForm = ({ 
  initialValues, 
  validate, 
  onSubmit 
}) => {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    const errors = await validate(values)

    setErrors({ ...errors })
    setTouched(touchAllFields(values))

    if (!isObjectEmpty(errors)) return

    onSubmit()
  }

  const handleChange = e => {
    const {name, value} = e.target

    setTouched({
      ...touched,
      [name]: false
    })

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleBlur = async e => {
    const { name } = e.target
    const newErrors = await validate(values)

    setErrors({ 
      ...errors,
      [name]: newErrors[name]
    })

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