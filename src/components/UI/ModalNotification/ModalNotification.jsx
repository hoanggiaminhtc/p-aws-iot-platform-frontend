import React from 'react';
import Modal from '~/components/Modal';

const ModalNotification = ({ title, des, onHandleClick }) => {
  return (
    <Modal>
      <div className="overflow-hidden rounded-3xl bg-white xs:w-[80%] md:w-[50%] lg:w-[35%]">
        <div className="py-9 px-14 text-center">
          <h3 className="mb-6 text-xl font-bold">{title}</h3>
          <p className="text-base">{des}</p>
        </div>
        <div
          to={'/log-in'}
          className="block cursor-pointer bg-gray-200 py-3 text-center text-base font-bold text-blue-800 hover:bg-gray-300"
          onClick={onHandleClick}
        >
          OK
        </div>
      </div>
    </Modal>
  );
};

export default ModalNotification;
