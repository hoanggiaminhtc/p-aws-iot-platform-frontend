import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaListAlt } from 'react-icons/fa';

import Device from './Device';
import FormSearch from '~/components/FormSearch';

const ListDevices = ({
  handleOpenModalDeleteDevice,
  deviceList = [],
  handleSubmitSearchDevice,
  handleGetDevice,
}) => {
  return (
    <div className="w-screen md:w-full">
      <div className="flex h-11 items-center bg-[#F6F8F8] px-4 text-base">
        Device List
        <FaListAlt className="ml-2 text-[#98A6AD]" />
      </div>
      {handleSubmitSearchDevice && (
        <div className="my-1 flex justify-end">
          <div className="mr-4 w-full md:w-1/3 ">
            <FormSearch
              handleSubmit={handleSubmitSearchDevice}
              onHandleGet={handleGetDevice}
            ></FormSearch>
          </div>
        </div>
      )}
      <div className="relative mx-4">
        <table className="w-full text-left text-sm text-gray-500 ">
          <thead className="text-xs uppercase text-gray-700 ">
            <tr>
              <th className="py-3 px-6 xs:hidden md:table-cell">
                Created time
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {deviceList.length > 0 &&
              deviceList.map((device, index) => {
                return (
                  <Device
                    key={device._id}
                    idDevice={device._id.toString()}
                    createdTime={new Date(device.createdAt).toLocaleDateString(
                      'en-GB',
                    )}
                    name={device.name}
                    type={device.type}
                    onClickHandleOpenDelete={handleOpenModalDeleteDevice}
                  />
                );
              })}
          </tbody>
        </table>
        {deviceList.length === 0 && (
          <p className="my-4 text-center text-[#000A3D]">
            Không tìm thấy bắt cứ Device nào
          </p>
        )}
      </div>
    </div>
  );
};

ListDevices.propTypes = {
  handleOpenModalDeleteDevice: PropTypes.func,
  deviceList: PropTypes.array,
  handleSubmitSearchDevice: PropTypes.func,
  handleGetDevice: PropTypes.func,
};

export default memo(ListDevices);
