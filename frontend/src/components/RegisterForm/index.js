import FormTitle from '../FormTitle'
import FormFields from '../FormFields'
import FormField from '../FormField'
import SubmitButton from '../SubmitButton'
import FormSuggestion from '../FormSuggestion'
import FormLink from '../FormLink'

const RegisterForm = () => {
  return (
    <form id="registerForm">
      <header>
        <FormTitle small>Board this</FormTitle>
        <FormTitle>Spacecraft!</FormTitle>
      </header>

      <FormFields>
        <FormField label="Email" type="email" />
        <FormField label="Username" type="text" />
        <FormField label="Password" type="text" />
      </FormFields>

      <SubmitButton>Create account</SubmitButton>
      <FormSuggestion>
        Already on board? <FormLink href="/login">Login</FormLink>
      </FormSuggestion>
    </form>
  )
}

export default RegisterForm