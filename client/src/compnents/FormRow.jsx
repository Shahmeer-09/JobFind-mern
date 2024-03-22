

const FormRow = ({type, name, labelText, Default, onchange}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText|| name }
        
      </label>
      <input
        type={type}
        className="form-input"
        id={name}
        name={name}
        required
        defaultValue={Default}
        onChange={onchange}
      />
    </div>
  );
};

export default FormRow;
