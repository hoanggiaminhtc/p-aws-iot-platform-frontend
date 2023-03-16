import React from 'react';
import PropTypes from 'prop-types';
import { RiShareLine, RiFolderUserFill } from 'react-icons/ri';
import { MdAssignmentReturn } from 'react-icons/md';
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
      className="cursor-pointer border-b bg-white hover:bg-gray-200"
      onClick={() => {
        handleNavigate(idDevice);
      }}
    >
      <td className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white xs:hidden md:table-cell">
        {createdTime}
      </td>
      <td className="py-4 px-6 text-black">{name}</td>
      <td className="py-4 px-6 text-black">{type}</td>
      <td className="py-4 text-[#6B6B6B]">
        <div className="flex items-center justify-center text-2xl">
          <div className="relative">
            <RiShareLine className="iconPopup mx-2 cursor-pointer hover:text-black" />
            <div className="iconShowPopup invisible absolute top-[-100%] left-1/2 flex w-28 translate-x-[-50%] justify-center rounded bg-[#757575] py-[2px] text-xs text-white">
              Make device public
            </div>
          </div>
          <div className="relative hidden md:block">
            <RiFolderUserFill className="iconPopup mx-2 cursor-pointer hover:text-black" />
            <div className="iconShowPopup invisible absolute top-[-100%] left-1/2 flex w-28 translate-x-[-50%] justify-center rounded bg-[#757575] py-[2px] text-xs text-white">
              Assign to customer
            </div>
          </div>
          <div className="relative hidden md:block">
            <MdAssignmentReturn className="iconPopup mx-2 cursor-pointer hover:text-black" />
            <div className="iconShowPopup invisible absolute top-[-100%] left-1/2 flex w-36 translate-x-[-50%] justify-center rounded bg-[#757575] py-[2px] text-xs text-white">
              Unassign from customer
            </div>
          </div>
          <div className="relative">
            <AiFillDelete
              className="iconPopup mx-2 cursor-pointer hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                onClickHandleOpenDelete(idDevice);
              }}
            />
            <div className="iconShowPopup invisible absolute top-[-100%] left-1/2 flex w-11 translate-x-[-50%] justify-center rounded bg-[#757575] py-[2px] text-xs text-white">
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
