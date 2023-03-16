import React from 'react';
import Modal from '~/components/Modal';
import Spinner from '../Spinner';

const LoadingModal = () => {
  return (
    <Modal>
      <Spinner />
    </Modal>
  );
};

export default LoadingModal;
