import React from 'react';

const RadioButtonGroup = props => {
  const { title, name, type, options, selectedOption, onChange } = props;

  return (
    <div className="form-input">
      <label htmlFor={name}>{title}</label>
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

// CheckboxOrRadioGroup.propTypes = {
// 	title: React.PropTypes.string.isRequired,
// 	type: React.PropTypes.oneOf(['checkbox', 'radio']).isRequired,
// 	setName: React.PropTypes.string.isRequired,
// 	options: React.PropTypes.array.isRequired,
// 	selectedOptions: React.PropTypes.array,
// 	controlFunc: React.PropTypes.func.isRequired
// };

export default RadioButtonGroup;
