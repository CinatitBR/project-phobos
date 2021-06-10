import AuthFormLayout from '../../components/AuthFormLayout'
import LoginForm from '../../components/LoginForm'

import planetsColonized from '../../assets/planets-colonized.svg'
import rocket from '../../assets/rocket.svg'
import './index.css'

const Login = () => {
  return (
    <AuthFormLayout form={<LoginForm />} >
      <img id="planetsColonized" src={planetsColonized} alt="Planets colonized" />
      <img id="rocket" src={rocket} alt="rocket" />
    </AuthFormLayout>
  )
}

export default Login