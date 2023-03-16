import React from 'react';
import PropTypes from 'prop-types';

const SpinnerEllipsis = ({ width = '60px', height = '60px' }) => {
  return (
    <div className="lds-ellipsis" style={{ width: width, height: height }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

SpinnerEllipsis.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SpinnerEllipsis;
