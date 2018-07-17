import React from 'react';
import PropTypes from 'prop-types';

const StringInput = props => (
  <div>
    <label>{props.title}</label>
    <input
      name={props.name}
      type={props.inputType}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
      required
    />
  </div>
);

StringInput.propTypes = {
  name: PropTypes.string.isRequired
};
export default StringInput;
