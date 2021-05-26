// import FormInput from '../components/FormInput'
// import SubmitButton from '../components/SubmitButton'
import FormRegister from '../components/FormRegister'

import logo from '../assets/logo.svg'
import planets from '../assets/planets.svg'
import phoebeAstronaut from '../assets/phoebe-astronaut.svg'

import './index.css'

const RegisterView = () => {
  return (
    <div id="wrapper">

      <section id="content">
        <img id="logo" src={logo} alt="Phobos logo" />

        <section id="contentInner">
          <FormRegister />
        </section>
        
        {/* <div id="contentInner">
          <h1 id="formTitle">
            Board this 
            <span className="big">Spacecraft!</span>
          </h1>

          <form>
            <div className="fields">

              <div className="field">
                <FormInput label="Email" type="email" />
              </div>

              <div className="field">
                <FormInput label="Username" type="text" />
              </div>

              <div className="field">
                <FormInput label="Password" type="text" />
              </div>

            </div>

            <SubmitButton text="Create account" />
            <h3 id="suggestion">Already on board? <a href="#">Login</a></h3>
          </form>
        </div> */}

      </section>

      <section id="ilustration">

        <img id="planets" src={planets} alt="Planets" />
        <img id="phoebeAstronaut" src={phoebeAstronaut} alt="Phoebe astronaut" />

      </section>

    </div>
  )
}

export default RegisterView