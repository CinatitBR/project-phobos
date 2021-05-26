import logo from '../../assets/logo.svg'
import './index.css'

const FormAuthWrapper = ({ children }) => {
  return (
    <section id="formAuthWrapper">
      <img id="logo" src={logo} alt="Phobos logo" />

      <section id="inner">
        {children}
      </section>
      
    </section>
  )
}

export default FormAuthWrapper