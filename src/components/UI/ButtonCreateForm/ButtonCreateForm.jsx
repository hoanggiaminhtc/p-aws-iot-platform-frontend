import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdAddCircle } from 'react-icons/io';

const ButtonCreateForm = ({ contentBtn, elementForm, handleAddSucess }) => {
  let ElementForm = elementForm;
  const [openModalCreateForm, setOpenModalCreateForm] = useState(false);

  const handleOpenModalCreateForm = () => {
    setOpenModalCreateForm(true);
  };

  const handleCloseModalCreateForm = () => {
    setOpenModalCreateForm(false);
  };

  return (
    <>
      <button
        className="flex h-[48px] w-[197px] items-center justify-center rounded-full border-none bg-[#FC2626] outline-none hover:bg-[#ff4646]"
        onClick={handleOpenModalCreateForm}
      >
        <IoMdAddCircle className="mr-1 h-[18px] w-[18px] text-[#ffffff]" />
        <span className="text-lg font-medium  leading-6 text-[#ffffff]">
          {contentBtn}
        </span>
      </button>
      {openModalCreateForm && (
        <ElementForm
          handleClickCLoseModal={handleCloseModalCreateForm}
          handleAddSucess={handleAddSucess}
        />
      )}
    </>
  );
};

ButtonCreateForm.propTypes = {
  contentBtn: PropTypes.string,
  elementForm: PropTypes.func,
  handleAddSucess: PropTypes.func,
};

export default ButtonCreateForm;
