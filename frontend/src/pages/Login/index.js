import SplitScreen from '../../components/SplitScreen'
import FormAuthWrapper from '../../components/FormAuthWrapper'
import LoginForm from '../../components/LoginForm'
import IlustrationWrapper from '../../components/IlustrationWrapper'

import planetsColonized from '../../assets/planets-colonized.svg'
import rocket from '../../assets/rocket.svg'

import './index.css'

const Login = () => {
  return (
    <SplitScreen>
      <FormAuthWrapper>
        <LoginForm />
      </FormAuthWrapper>

      <IlustrationWrapper>
        <img id="planetsColonized" src={planetsColonized} alt="Planets colonized" />
        <img id="rocket" src={rocket} alt="rocket" />
      </IlustrationWrapper>
    </SplitScreen>
  )
}

export default Login