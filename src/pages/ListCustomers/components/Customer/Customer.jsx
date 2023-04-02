/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Customer = ({
  idCustomer,
  createdTime,
  name,
  addressCustomer,
  onClickHandleOpenDelete,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/customer-gateways/${idCustomer}`);
  };

  return (
    <tr
      className="cursor-pointer border-b bg-white hover:bg-gray-200 dark:bg-[#242526] dark:hover:bg-black"
      onClick={() => {
        handleNavigate(idCustomer);
      }}
    >
      <th
        scope="row"
        className="hidden whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white lg:block lg:px-6"
      >
        {createdTime}
      </th>
      <td className="px-1 py-4 text-black dark:text-white lg:px-6">{name}</td>
      <td className="px-1 py-4 text-black dark:text-white lg:px-6">
        {addressCustomer}
      </td>
      <td className="hidden py-4 text-[#6B6B6B] dark:text-white lg:block">
        <div className="flex items-center justify-center text-2xl">
          <div className="relative">
            <AiFillDelete
              className="iconPopup mx-2 cursor-pointer hover:text-black dark:hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onClickHandleOpenDelete(idCustomer);
              }}
            />
            <div className="iconShowPopup invisible absolute top-[-100%] left-1/2 flex w-11 translate-x-[-50%] justify-center rounded bg-[#757575] py-[2px] text-xs text-white dark:bg-white dark:text-black">
              Delete
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

Customer.propTypes = {
  idCustomer: PropTypes.string,
  createdTime: PropTypes.any,
  name: PropTypes.string,
  addressCustomer: PropTypes.string,
  onClickHandleOpenDelete: PropTypes.func,
};

export default Customer;
