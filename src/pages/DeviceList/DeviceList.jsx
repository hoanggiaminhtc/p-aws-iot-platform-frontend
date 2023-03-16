import React, { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Dialog from '~/components/Dialog';
import { getDevices, deleteDevice } from '~/api/deviceApi';
import ListDevices from '../Devices/components/ListDevices';

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [openModalDeleteDevice, setOpenModalDeleteDevice] = useState(false);

  const idDevice = useRef(null);

  const handleCloseModalDeleteDevice = () => {
    setOpenModalDeleteDevice(false);
  };

  const handleGetDevice = () => {
    getDevices()
      .then((data) => {
        setDeviceList(data.data.data.device);
      })
      .catch((err) => {
        toast.error('Có lỗi trong quá trình lấy thiết bị!', {
          theme: 'colored',
        });
      });
  };

  const handleDeleteDevice = () => {
    deleteDevice(idDevice.current)
      .then((data) => {
        let newDeviceList = deviceList.filter(
          (device) => device._id !== idDevice.current,
        );
        setDeviceList(newDeviceList);
        toast.success('Xóa thiết bị thành công!', {
          theme: 'colored',
        });
      })
      .catch(() => {
        toast.error('Xóa thiết bị thất bại!', {
          theme: 'colored',
        });
      })
      .finally(() => {
        idDevice.current = null;
        setOpenModalDeleteDevice(false);
      });
  };
  const handleOpenModalDeleteDevice = useCallback((idDeviceDelete) => {
    idDevice.current = idDeviceDelete;
    setOpenModalDeleteDevice(true);
  }, []);

  useEffect(() => {
    handleGetDevice();
  }, []);
  return (
    <div>
      <div className="flex h-12 items-center bg-[#F8F8F8] pl-4 capitalize text-[##333333]">
        {`Gateways/${'Gateway 1'}`}
      </div>

      <div className="pb-6">
        <ListDevices
          handleOpenModalDeleteDevice={handleOpenModalDeleteDevice}
          deviceList={deviceList}
          handleGetDevice={handleGetDevice}
        />
        {openModalDeleteDevice && (
          <Dialog
            nameBtn="Xóa thiết bị"
            desBtn="Bạn sẽ mất tất cả dữ liệu bằng cách xóa thiết bị của mình. Hành
          động này không thể quay trở lại được."
            handleClickCancel={handleCloseModalDeleteDevice}
            handeClickDelete={handleDeleteDevice}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceList;
