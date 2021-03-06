import { useLocation, useHistory } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import useAuth from '../../hooks/useAuth'
import loginValidation from '../../../../shared/src/validations/loginValidation'

import Title from '../Title'
import FormFields from '../FormFields'
import FormField from '../FormField'
import { Button } from '../Buttons'
import FormSuggestion from '../FormSuggestion'
import FormLink from '../FormLink'

import './index.css'

const initialValues = {
  email: '',
  password: ''
}

const LoginForm = () => {
  const auth = useAuth()
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: '/' } 

  const form = useForm({
    initialValues,

    validate: loginValidation,

    onSubmit: async (values, setErrors) => {
      try {
        await auth.login(values)

        history.replace(from)
      }
      catch (errors) {
        setErrors(errors)
      }
    }
  })

  return (
    <form id="loginForm" onSubmit={form.handleSubmit}>
      <header>
        <Title fontSize="45px">Welcome again!</Title>
        <Title fontSize="20px">We are happy you came back :)</Title>
      </header>

      <FormFields>
        <FormField 
          label="Email" 
          type="text"
          name="email"
          value={form.values.email} 
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          touched={form.touched.email}
          error={form.errors.email}
        />

        <FormField 
          label="Password" 
          type="password"
          name="password" 
          value={form.values.password} 
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          touched={form.touched.password}
          error={form.errors.password}
        />
      </FormFields>

      <div id="formFooter">
        <Button fullWidth>Login</Button>

        <FormSuggestion>
          Need an account? <FormLink href="/register">Create Account</FormLink>
        </FormSuggestion>
      </div>
    </form>
  )
}

export default LoginForm