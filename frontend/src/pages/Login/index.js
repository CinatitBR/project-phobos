import SplitScreen from '../../components/SplitScreen'
import FormAuthWrapper from '../../components/FormAuthWrapper'
import LoginForm from '../../components/LoginForm'
import IlustrationWrapper from '../../components/IlustrationWrapper'

import './index.css'

const Login = () => {
  return (
    <SplitScreen>
      <FormAuthWrapper>
        <LoginForm />
      </FormAuthWrapper>

      <IlustrationWrapper>
        <h1>Olá, tudo bem</h1>
      </IlustrationWrapper>
    </SplitScreen>
  )
}

export default Login