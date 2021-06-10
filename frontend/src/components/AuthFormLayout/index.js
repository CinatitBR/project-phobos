import logo from '../../assets/logo.svg'


import './index.css'

const AuthFormLayout = ({ form, children }) => {
  return (
    <section id="authFormLayout">

      <section id="content">
        <img id="logo" src={logo} alt="Phobos logo" />

        <div id="formWrapper">
          {form}
        </div>
      </section>

      <section id="illustration">
        {children}
      </section>

    </section>
  )
}

export default AuthFormLayout
