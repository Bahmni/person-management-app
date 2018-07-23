import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  const {
    title,
    name,
    type,
    value,
    onChange,
    placeholder,
    required,
    ...other // rest
  } = props; // object desctructuring
  return (
    <div className="form-input">
      <label htmlFor={name}>
        {title}
        {required ? '*' : null}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        aria-label={placeholder}
        onChange={onChange}
        {...other} //object spread
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'date']).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string
};

export default Input;
