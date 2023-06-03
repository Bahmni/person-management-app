// button with three states: normal, disabled and loading (with spinner)
// can take an optional svg icon

import React from 'react';
import Icon from '../common/Icon';
import './Button.css';

const Button = props => {
  const { value, valueLoading, disabled, isLoading, onClick, data } = props;

  let loadingButton = null;

  if (isLoading) {
    if (valueLoading) {
      loadingButton = (
        <div className="loadingButtonWithSvg">
          <div className="spinner svgSpinner" />
          <span className="buttonText"> {valueLoading}</span>
        </div>
      );
    } else {
      loadingButton = <div className="spinner" />;
    }
  } else {
    if (valueLoading) {
      loadingButton = (
        <div className="searchPageButton ">
          <Icon data={data} />
          <span className="buttonText"> {value}</span>
        </div>
      );
    } else {
      loadingButton = <span className="buttonText"> {value}</span>;
    }
  }

  return (
    <div className="buttonContainer">
      <button
        className={
          value == 'Cancel' ? 'cancelButtonWithSpinner' : 'buttonWithSpinner'
        }
        disabled={disabled}
        onClick={onClick}
      >
        {loadingButton}
      </button>
    </div>
  );
};

export default Button;
