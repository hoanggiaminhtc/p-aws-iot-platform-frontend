import React from 'react';
import PropTypes from 'prop-types';
// import { RiShareLine } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Device = ({
  idDevice,
  createdTime,
  name,
  type = 'Default',
  onClickHandleOpenDelete,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (idDevice) => {
    navigate(`/devices/${idDevice}`);
  };

  return (
    <tr
      className="cursor-pointer border-b bg-white hover:bg-gray-200 dark:bg-[#242526] dark:hover:bg-black"
      onClick={() => {
        handleNavigate(idDevice);
      }}
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white xs:hidden md:table-cell">
        {createdTime}
      </td>
      <td className="px-6 py-4 text-black dark:text-white">{name}</td>
      <td className="px-6 py-4 text-black dark:text-white">{type}</td>
      <td className="py-4 text-[#6B6B6B]">
        <div className="flex items-center justify-center text-2xl">
          <div className="relative">
            <AiFillDelete
              className="iconPopup mx-2 cursor-pointer hover:text-black dark:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onClickHandleOpenDelete(idDevice);
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

Device.propTypes = {
  idDevice: PropTypes.string,
  createdTime: PropTypes.any,
  name: PropTypes.string,
  type: PropTypes.string,
  onClickHandleOpenDelete: PropTypes.func,
};

export default Device;
