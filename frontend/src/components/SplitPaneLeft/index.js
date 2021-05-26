import logo from '../../assets/logo.svg'
import './index.css'

const SplitPaneLeft = ({ children }) => {
  return (
    <section id="splitPaneLeft">
      <img id="logo" src={logo} alt="Phobos logo" />

      <section id="inner">
        {children}
      </section>
      
    </section>
  )
}

export default SplitPaneLeft