import { useState } from 'react'

import SplitScreen from '../../components/SplitScreen'
import FormAuthWrapper from '../../components/FormAuthWrapper'
import IlustrationWrapper from '../../components/IlustrationWrapper'
import RegisterForm from '../../components/RegisterForm'
import Portal from '../../components/Portal'
import Modal from '../../components/Modal'

import planets from '../../assets/planets.svg'
import phoebeAstronaut from '../../assets/phoebe-astronaut.svg'
import './index.css'

const Register = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <SplitScreen>

      <FormAuthWrapper>
        <RegisterForm onShowModal={() => setShowModal(true)} />
      </FormAuthWrapper>

      <IlustrationWrapper>
        <img id="planets" src={planets} alt="Planets" />
        <img id="phoebeAstronaut" src={phoebeAstronaut} alt="Phoebe astronaut" />
      </IlustrationWrapper>


      <Portal> 
        <Modal isOpen={showModal} />
      </Portal>
    </SplitScreen>
  )
}

export default Register