import Title from '../Title'
import FormFields from '../FormFields'
import FormField from '../FormField'
import Button from '../Button'
import FormSuggestion from '../FormSuggestion'
import FormLink from '../FormLink'

const LoginForm = () => {
  return (
    <form id="loginForm">
      <header>
        <Title>Welcome again!</Title>
        <Title fontSize="30px">We are happy you came back :)</Title>
      </header>

      <FormFields>
        <FormField label="Email" type="text" />
        <FormField label="Password" type="password" />
      </FormFields>

      <Button>Login</Button>
      <FormSuggestion>
        Need an account? <FormLink href="/register">Create Account</FormLink>
      </FormSuggestion>
    </form>
  )
}

export default LoginForm