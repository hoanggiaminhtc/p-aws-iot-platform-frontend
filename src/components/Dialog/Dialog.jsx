import React from 'react';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Modal from '~/components/Modal';

const Dialog = ({ nameBtn, desBtn, handleClickCancel, handeClickDelete }) => {
  return (
    <Modal>
      <div className="min-h-screen px-4 md:flex md:items-center md:justify-center">
        <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-25"></div>
        <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-4 md:relative md:mx-auto md:max-w-md">
          <div className="items-center md:flex">
            <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-gray-300">
              <RiDeleteBin6Line className="text-2xl text-red-600" />
            </div>
            <div className="mt-4 text-center md:mt-0 md:ml-6 md:text-left">
              <p className="font-bold">{nameBtn}</p>
              <p className="mt-1 text-sm text-gray-700">{desBtn}</p>
            </div>
          </div>
          <div className="mt-4 text-center md:flex md:justify-end md:text-right">
            <button
              className="block w-full rounded-lg bg-red-200 px-4 py-3 text-sm font-semibold text-red-700 md:order-2 md:ml-2 md:inline-block md:w-auto md:py-2"
              onClick={handeClickDelete}
            >
              {nameBtn}
            </button>
            <button
              className="mt-4 block w-full rounded-lg bg-gray-200 px-4 py-3 text-sm font-semibold md:order-1 md:mt-0 md:inline-block
          md:w-auto md:py-2"
              onClick={handleClickCancel}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

Dialog.propTypes = {
  nameBtn: PropTypes.string,
  desBtn: PropTypes.string,
  handleClickCancel: PropTypes.func,
  handeClickDelete: PropTypes.func,
};

export default Dialog;
