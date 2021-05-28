import useForm from '../../hooks/useForm'

import FormTitle from '../FormTitle'
import FormFields from '../FormFields'
import FormField from '../FormField'
import SubmitButton from '../SubmitButton'
import FormSuggestion from '../FormSuggestion'
import FormLink from '../FormLink'

const RegisterForm = () => {

  const { 
    values,
    touched,
    errors,
    handleSubmit, 
    handleChange, 
    handleBlur  
  } = useForm({
    email: '', 
    username: '', 
    password: ''
  })

  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      <header>
        <FormTitle small>Board this</FormTitle>
        <FormTitle>Spacecraft!</FormTitle>
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

      <SubmitButton>Create account</SubmitButton>
      <FormSuggestion>
        Already on board? <FormLink href="/login">Login</FormLink>
      </FormSuggestion>
    </form>
  )
}

export default RegisterForm