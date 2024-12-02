import React from 'react';
import './styles/FormInput.css';

const FormInput = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="form-group mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
