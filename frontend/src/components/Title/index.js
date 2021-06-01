import './index.css'

const Title = ({ children, ...rest }) => {
  return (
    <h1 id="title" style={{...rest}}>
      {children}
    </h1>
  )
}

export default Title