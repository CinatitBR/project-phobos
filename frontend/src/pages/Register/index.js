import { useState } from 'react'

import AuthFormLayout from '../../components/AuthFormLayout'
import RegisterForm from '../../components/RegisterForm'
import Modal from '../../components/Modal'
import { useHistory } from 'react-router-dom'
import Title from '../../components/Title'
import IconButton from '../../components/IconButton'
import { FaSignInAlt } from 'react-icons/fa'

import planets from '../../assets/planets.svg'
import phoebeAstronaut from '../../assets/phoebe-astronaut.svg'
import './index.css'

const Register = () => {
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()

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

      <Modal show={showModal} onClose={toggleModal} style={{ width: 'min(600px, 100%)' }}>
        <header>
          <Title>Account created</Title>
          <Title>successfully!</Title>
        </header>

          <IconButton 
            onClick={() => history.push('/login')}
            finalIcon={<FaSignInAlt />}>
            Log in to account
          </IconButton>
      </Modal>
    </>
  )
}

export default Register
