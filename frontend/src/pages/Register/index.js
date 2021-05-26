import SplitScreen from '../../components/SplitScreen'
import FormAuthWrapper from '../../components/FormAuthWrapper'
import IlustrationWrapper from '../../components/IlustrationWrapper'
import RegisterForm from '../../components/RegisterForm'

import planets from '../../assets/planets.svg'
import phoebeAstronaut from '../../assets/phoebe-astronaut.svg'

import './index.css'

const Register = () => {
  return (
    <SplitScreen>

      <FormAuthWrapper>
        <RegisterForm />
      </FormAuthWrapper>

      <IlustrationWrapper>

        <img id="planets" src={planets} alt="Planets" />
        <img id="phoebeAstronaut" src={phoebeAstronaut} alt="Phoebe astronaut" />

      </IlustrationWrapper>

    </SplitScreen>
  )
}

export default Register