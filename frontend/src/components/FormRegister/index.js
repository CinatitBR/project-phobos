import FormInput from '../FormInput'
import SubmitButton from '../SubmitButton'

import './index.css'

const FormRegister = () => {
  return (
    <form id="formRegister">
      <header>
        <h1 id="title">
          Board this 
          <span className="big">Spacecraft!</span>
        </h1>
      </header>

      <div id="fields">
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

      <SubmitButton>Create account</SubmitButton>
      <h3 id="suggestion">Already on board? <a href="#">Login</a></h3>
    </form>
  )
}

export default FormRegister