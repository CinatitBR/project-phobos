import { useState } from 'react'

import AuthFormLayout from '../../components/AuthFormLayout'
import RegisterForm from '../../components/RegisterForm'
import Portal from '../../components/Portal'
import Modal from '../../components/Modal'

import planets from '../../assets/planets.svg'
import phoebeAstronaut from '../../assets/phoebe-astronaut.svg'
import './index.css'

const Register = () => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal(!showModal)

  return (
    <>
      <AuthFormLayout form={<RegisterForm onShowModal={toggleModal} />}>
        <img id="planets" src={planets} alt="Planets" />
        <img
          id="phoebeAstronaut"
          src={phoebeAstronaut}
          alt="Phoebe astronaut"
        />
      </AuthFormLayout>

      <Portal>
        <Modal show={showModal} onClose={toggleModal} />
      </Portal>
    </>
  )
}

export default Register
