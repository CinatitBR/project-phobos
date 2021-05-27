import FormTitle from '../FormTitle'
import FormFields from '../FormFields'
import FormField from '../FormField'
import SubmitButton from '../SubmitButton'
import FormSuggestion from '../FormSuggestion'
import FormLink from '../FormLink'

const LoginForm = () => {
  return (
    <form id="loginForm">
      <header>
        <FormTitle>Welcome again!</FormTitle>
        <FormTitle small>We are happy you came back :)</FormTitle>
      </header>

      <FormFields>
        <FormField label="Email" type="text" />
        <FormField label="Password" type="password" />
      </FormFields>

      <SubmitButton>Login</SubmitButton>
      <FormSuggestion>
        Need an account? <FormLink href="/register">Create Account</FormLink>
      </FormSuggestion>
    </form>
  )
}

export default LoginForm