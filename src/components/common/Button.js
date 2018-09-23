import React from 'react';
import Icon from '../common/Icon';
import './Button.css';

const Button = props => {
  const {
    value,
    valueLoading,
    disabled,
    isLoading,
    searchPage = false,
    onClick
  } = props;
  return (
    <div className="buttonContainer">
      <button
        className="buttonWithSpinner"
        disabled={disabled}
        onClick={onClick}
      >
        {isLoading ? (
          searchPage ? (
            <div className="loadingButtonWithSvg">
              <div className="spinner svgSpinner" />
              <span className="buttonText"> {valueLoading}</span>
            </div>
          ) : (
            <div className="spinner" />
          )
        ) : searchPage ? (
          <div className="searchPageButton ">
            <Icon
              data="M47.2,43.8L34.3,30.9c2.5-3.2,4-7.3,4-11.7c0-10.6-8.6-19.1-19.1-19.1C8.7,0.1,0.1,8.7,0.1,19.2
              c0,10.6,8.6,19.1,19.1,19.1c4.4,0,8.5-1.5,11.7-4l12.9,12.9c0.5,0.5,1.1,0.7,1.7,0.7s1.2-0.2,1.7-0.7C48.2,46.3,48.2,44.8,47.2,43.8
              z
              M4.9,19.2c0-7.9,6.4-14.3,14.3-14.3s14.3,6.4,14.3,14.3c0,7.9-6.4,14.3-14.3,14.3S4.9,27.1,4.9,19.2z"
            />
            <span className="buttonText"> {value}</span>
          </div>
        ) : (
          <span className="buttonText"> {value}</span>
        )}
      </button>
    </div>
  );
};

export default Button;
