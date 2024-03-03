

const FormRow = ({type, name, labelText, Default}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText|| name }
      </label>
      <input
        type={type}
        className="form-input"
        id={name}
        required
        defaultValue={Default}
      />
    </div>
  );
};

export default FormRow;
