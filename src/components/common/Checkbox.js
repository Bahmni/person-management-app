import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const { name, title, onChange, checked } = props;
  return (
    <div className="form-input">
      <div className="input-label">
        <label id="hidden-title" htmlFor={name}>
          {title}
        </label>
      </div>
      <label>
        <div className="checkbox-container">
          <input
            name={name}
            type="checkbox"
            onChange={onChange}
            checked={checked}
            id="checkbox"
          />
          <label className="labelCheckbox" htmlFor="checkbox">
            <span />
          </label>
          <span id="estimatedTitle">{title}</span>
        </div>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
