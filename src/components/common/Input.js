// input component for input type text, number or date

import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = props => {
  const {
    title,
    name,
    type,
    value,
    onChange,
    placeholder,
    required,
    min,
    max,
    pattern,
    disabled
  } = props;
  return (
    <div className="form-input">
      <div className="input-label">
        <label className={required ? 'required' : null}>{title}</label>
      </div>
      <div className="div-input">
        <label>
          <input
            autoComplete="off"
            name={name}
            type={type}
            value={value}
            aria-label={placeholder}
            onChange={onChange}
            required={required}
            min={min}
            max={max}
            pattern={pattern}
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'date', 'tel', 'email']).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default Input;
