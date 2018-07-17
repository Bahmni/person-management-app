import React from 'react';

const SelectFromList = props => (
  <div>
    <select
      name={props.name}
      value={props.selectedOption}
      onChange={props.controlFunc}
    >
      <option value="">{props.placeholder}</option>
      {props.options.map(opt => {
        return (
          <option key={opt} value={opt}>
            {opt}
          </option>
        );
      })}
    </select>
  </div>
);

export default SelectFromList;
