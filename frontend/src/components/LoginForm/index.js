import Title from '../Title'
import FormFields from '../FormFields'
import FormField from '../FormField'
import Button from '../Button'
import FormSuggestion from '../FormSuggestion'
import FormLink from '../FormLink'

import './index.css'

const LoginForm = () => {
  return (
    <form id="loginForm">
      <header>
        <Title fontSize="45px">Welcome again!</Title>
        <Title fontSize="20px">We are happy you came back :)</Title>
      </header>

      <FormFields>
        <FormField label="Email" type="text" />
        <FormField label="Password" type="password" />
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