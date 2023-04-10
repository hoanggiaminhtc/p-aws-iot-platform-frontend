import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCustomerDevices } from '~/api/adminApi';

const CustomerDevice = () => {
  const [devices, setDevices] = useState([]);
  const params = useParams();
  useEffect(() => {
    getCustomerDevices(params.id)
      .then((data) => {
        setDevices(data.data.data.deviceinfo);
      })
      .catch(() => toast.error('Lấy dữ liệu thất bại'));
  }, [params.id]);

  return (
    <div className="px-10 dark:text-white">
      <ul className="grid grid-cols-3 py-4 text-left text-sm font-semibold text-[#374151] dark:text-white">
        <li>Device Name</li>
        <li>Create At</li>
        <li>Device Connect Status</li>
      </ul>
      {devices.map((device) => {
        return (
          <ul
            className="grid grid-cols-3 px-2 py-4 text-left hover:bg-gray-300 dark:text-white"
            key={device._id}
          >
            <li>{device.name}</li>
            <li>{new Date(device.createdAt).toLocaleDateString('en-GB')}</li>
            <li
              style={{
                color:
                  device.connectstatus === 'Not Connected' ? 'red' : 'green',
              }}
            >
              {device.connectstatus}
            </li>
          </ul>
        );
      })}
      {devices?.length === 0 && <p className="text-center">Thiết bị rỗng</p>}
    </div>
  );
};

export default CustomerDevice;