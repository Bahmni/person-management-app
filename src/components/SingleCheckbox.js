import React from 'react';

const SingleCheckbox = props => {
  const { name, title, type, onChange, checked } = props;
  return (
    <div className="form-input">
      <div className="input-label">
        <label htmlFor={name}>{title}</label>
      </div>
      <div>
        <input name={name} type={type} onChange={onChange} checked={checked} />
      </div>
    </div>
  );
};

export default SingleCheckbox;
