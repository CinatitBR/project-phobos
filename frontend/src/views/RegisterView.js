import Label from '../components/Label'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'

import logo from '../assets/logo.svg'
import planets from '../assets/planets.svg'
import phoebeAstronaut from '../assets/phoebe-astronaut.svg'

import './index.css'

const RegisterView = () => {
  return (
    <div id="wrapper">

      <section id="content">
        <img id="logo" src={logo} alt="Phobos logo" />
        
        <div id="contentInner">
          <h1 id="formTitle">
            Board this 
            <span className="big">Spacecraft!</span>
          </h1>

          <form>
            <div className="fields">

              <div className="field">
                <Label label="Email">
                  <Input type="email" />
                </Label>
              </div>

              <div className="field">
                <Label label="Username">
                  <Input type="text" />
                </Label>
              </div>

              <div className="field">
                <Label label="Password">
                  <Input type="text" />
                </Label >
              </div>

            </div>

            <SubmitButton text="Create account" />
            <h3 id="suggestion">Already on board? <a href="#">Login</a></h3>
          </form>
        </div>

      </section>

      <section id="ilustration">

        <img id="planets" src={planets} alt="Planets" />
        <img id="phoebeAstronaut" src={phoebeAstronaut} alt="Phoebe astronaut" />

      </section>

    </div>
  )
}

export default RegisterView