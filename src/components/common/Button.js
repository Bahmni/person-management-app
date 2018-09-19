import React from 'react';
import './Button.css';

const Button = props => {
  const { value, disabled, isLoading } = props;
  return (
    <div className="buttonContainer">
      <button className="buttonWithSpinner" disabled={disabled}>
        {isLoading ? (
          <div className="spinner" />
        ) : (
          <span className="buttonText"> {value}</span>
        )}
      </button>
    </div>
  );
};

export default Button;
