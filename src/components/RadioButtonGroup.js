import React from 'react';
import PropTypes from 'prop-types';

const RadioButtonGroup = props => {
  const {
    title,
    name,
    type,
    options,
    selectedOption,
    onChange,
    required
  } = props;

  return (
    <div className="form-input">
      <label htmlFor={name}>
        {title}
        {required ? '*' : null}
      </label>
      <div>
        {options.map(option => {
          return (
            <label key={option}>
              <input
                name={name}
                onChange={onChange}
                value={option}
                checked={selectedOption.indexOf(option) > -1}
                type={type}
              />{' '}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};

RadioButtonGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio']).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default RadioButtonGroup;
