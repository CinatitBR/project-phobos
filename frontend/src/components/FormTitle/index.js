import './index.css'

const FormTitle = ({ children, small }) => {
  return (
    <div id="formTitle">
      {small 
        ? <p className="small">{children}</p>
        : <h1>{children}</h1>
      }
    </div>
  )
}

export default FormTitle