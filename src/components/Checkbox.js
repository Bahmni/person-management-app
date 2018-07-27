import React from 'react';

const Checkbox = props => {
  const { name, title, type, onChange, checked } = props;
  return (
    <div className="form-input">
      <div className="input-label">
        <label htmlFor={name}>{title}</label>
      </div>
      <label className="myCheckbox">
        <input name={name} type={type} onChange={onChange} checked={checked} />
        <span />
      </label>
    </div>
  );
};

export default Checkbox;
