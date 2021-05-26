import SplitScreen from '../../components/SplitScreen'
import FormAuthWrapper from '../../components/FormAuthWrapper'
import SplitPaneRight from '../../components/SplitPaneRight'
import FormRegister from '../../components/FormRegister'

import planets from '../../assets/planets.svg'
import phoebeAstronaut from '../../assets/phoebe-astronaut.svg'

import './index.css'

const Register = () => {
  return (
    <SplitScreen>

      <FormAuthWrapper>
        <FormRegister />
      </FormAuthWrapper>

      <SplitPaneRight>

        <img id="planets" src={planets} alt="Planets" />
        <img id="phoebeAstronaut" src={phoebeAstronaut} alt="Phoebe astronaut" />

      </SplitPaneRight>

    </SplitScreen>
  )
}

export default Register