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
    ...other // rest
  } = props; // object desctructuring
  return (
    <div>
      <label>{title}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...other} //object spread
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired
};
export default Input;
