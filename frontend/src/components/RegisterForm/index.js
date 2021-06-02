import useForm from '../../hooks/useForm'
import registerValidation from '../../../../shared/src/validations/registerValidation'

import Title from '../Title'
import FormFields from '../FormFields'
import FormField from '../FormField'
import Button from '../Button'
import FormSuggestion from '../FormSuggestion'
import FormLink from '../FormLink'

import './index.css'

const initialValues = {
  email: '', 
  username: '', 
  password: ''
}

const RegisterForm = () => {

  const { 
    values,
    touched,
    errors,
    handleSubmit, 
    handleChange, 
    handleBlur  
  } = useForm({initialValues, validate: registerValidation})

  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      <header>
        <Title>Board this</Title>
        <Title fontSize="45px">Spacecraft!</Title>
      </header>

      <FormFields>
        <FormField 
          label="Email" 
          type="email" 
          value={values.email} 
          name="email" 
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.email}
          error={errors.email}
        />

        <FormField 
          label="Username"
          type="text" 
          value={values.username} 
          name="username" 
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.username}
          error={errors.username}
        />

        <FormField 
          label="Password" 
          type="text" 
          value={values.password} 
          name="password" 
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.password}
          error={errors.password}
        />
      </FormFields>

      <div className="formFooter">
        <Button fullWidth>Create account</Button>
        <FormSuggestion>
          Already on board? <FormLink href="/login">Login</FormLink>
        </FormSuggestion>
      </div>
    </form>
  )
}

export default RegisterForm