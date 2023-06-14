import PropTypes from 'prop-types';
import React from 'react';
import './Dropdown.css';

const Dropdown = props => {
  const { name, required, title, items, onChange, value, disabled } = props;
  return (
    <div className="form-input">
      <div className="input-label">
        <label className={required ? 'required' : null}>{title}</label>
      </div>
      <div>
        <select
          className="div-select"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {items.map(item => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Dropdown;
