import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children }) => {
  return (
    <div className="modal-animation fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
