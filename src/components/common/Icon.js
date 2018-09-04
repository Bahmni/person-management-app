import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <svg className="modalSvg" width="70" height="70" viewBox="0 0 140 140">
    <path d={props.data} fill="#FFFFFF" fillOpacity="0.5" />
  </svg>
);

Icon.propTypes = {
  data: PropTypes.string.isRequired
};

export default Icon;
