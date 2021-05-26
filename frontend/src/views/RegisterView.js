import SplitPane from '../components/SplitPane'
import SplitPaneLeft from '../components/SplitPaneLeft'
import SplitPaneRight from '../components/SplitPaneRight'
import FormRegister from '../components/FormRegister'

import planets from '../assets/planets.svg'
import phoebeAstronaut from '../assets/phoebe-astronaut.svg'

import './index.css'

const RegisterView = () => {
  return (
    <SplitPane>

      <SplitPaneLeft>
        <FormRegister />
      </SplitPaneLeft>

      <SplitPaneRight>

        <img id="planets" src={planets} alt="Planets" />
        <img id="phoebeAstronaut" src={phoebeAstronaut} alt="Phoebe astronaut" />

      </SplitPaneRight>

    </SplitPane>
  )
}

export default RegisterView