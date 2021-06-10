import useForm from '../../hooks/useForm'
import registerValidation from '../../../../shared/src/validations/registerValidation'
import useAuth from '../../hooks/useAuth'

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

const RegisterForm = ({ onShowModal }) => {
  const auth = useAuth()

  const form = useForm({
    initialValues, 
    validate: registerValidation,
    onSubmit: async (values, setErrors) => {
      try {
        await auth.register(values)

        onShowModal()
      }
      catch (errors) {
        setErrors(errors)
      }
    }
  })

  return (
    <form id="registerForm" onSubmit={form.handleSubmit}>
      <header>
        <Title>Board this</Title>
        <Title fontSize="45px">Spacecraft!</Title>
      </header>

      <FormFields>
        <FormField 
          label="Email" 
          type="email" 
          value={form.values.email} 
          name="email" 
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          touched={form.touched.email}
          error={form.errors.email}
        />

        <FormField 
          label="Username"
          type="text" 
          value={form.values.username} 
          name="username" 
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          touched={form.touched.username}
          error={form.errors.username}
        />

        <FormField 
          label="Password" 
          type="password" 
          value={form.values.password} 
          name="password" 
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          touched={form.touched.password}
          error={form.errors.password}
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