import './index.css'

const FormField = ({ label, type }) => {
  return (
    <div id="formField">
      <label>
        {label}

        <input type={type} />
      </label>
    </div>
  )
}

export default FormField