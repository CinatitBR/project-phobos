import SplitPaneLeft from '../components/SplitPaneLeft'
import FormRegister from '../components/FormRegister'

import planets from '../assets/planets.svg'
import phoebeAstronaut from '../assets/phoebe-astronaut.svg'

import './index.css'

const RegisterView = () => {
  return (
    <div id="wrapper">

      <SplitPaneLeft>
        <FormRegister />
      </SplitPaneLeft>

      <section id="ilustration">

        <img id="planets" src={planets} alt="Planets" />
        <img id="phoebeAstronaut" src={phoebeAstronaut} alt="Phoebe astronaut" />

      </section>

    </div>
  )
}

export default RegisterView