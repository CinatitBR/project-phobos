import './index.css'

const FormInput = ({ label, type }) => {
  return (
    <div id="formInput">
      <label>
        {label}

        <input type={type} />
      </label>
    </div>
  )
}

export default FormInput