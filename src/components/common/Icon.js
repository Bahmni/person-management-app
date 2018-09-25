// icon component for generating svgs, only needs svg data

import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <svg className="modalSvg" width="70" height="70" viewBox="0 0 140 140">
    <path d={props.data} fill="#FFFFFF" />
  </svg>
);

Icon.propTypes = {
  data: PropTypes.string.isRequired
};

export default Icon;
