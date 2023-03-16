import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FaBook,
  FaCode,
  FaHeadset,
  FaLock,
  FaMagic,
  FaRocket,
  FaVideo,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import BlockWrapperIntroduce from '~/components/BlockWrapperIntroduce';
import Dialog from '~/components/Dialog';
import SideBarIntroduces from '~/components/SideBarIntroduces';
import FormCreateDevice from './components/FormCreateDevice';
import ListDevices from './components/ListDevices';
// import Pagination from '~/components/Pagination';
import { deleteDevice, getDevices, searchDevice } from '~/api/deviceApi';

const CONTENT1 = [
  {
    icon: FaRocket,
    title: 'CONNECT ANY DEVICE',
    content:
      'Thinger.io platform is hardware agnostic. Use it to connect any device, from microcontrollers to Linux devices. Use the protocol you prefer.',
  },
  {
    icon: FaMagic,
    title: 'UNIQUE IOT EXPERIENCE',
    content:
      'Use IOTMP protocol to enable REST APIs on devices, remote shells, tunnels to device services, configurable streams, API discovery, etc.',
  },
  {
    icon: FaLock,
    title: 'SECURE DEPLOYMENT',
    content:
      'All our endpoints and compatible devices are secure by default. Device access can be granted with OAuth2 clients, access tokens, etc.',
  },
];

const CONTENT2 = [
  {
    icon: FaBook,
    title: 'Product Docs',
    subTitle: 'Devices Documentation',
    content: 'Documentation about devices and its configuration',
  },
  {
    icon: FaVideo,
    title: 'Product Tutorial',
    subTitle: 'Devices Tutorial',
    content: 'Tutorial to get started with devices and its features',
  },
  {
    icon: FaHeadset,
    title: 'Product Support',
    subTitle: 'Devices Support',
    content: 'Ask our experts about devices and its possibilities',
  },
  {
    icon: FaCode,
    title: 'API',
    subTitle: 'Devices API',
    content: 'Manage and configure devices via REST API',
  },
];

const Devices = () => {
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

  const handleSubmitSearchDevice = useCallback((nameDevice) => {
    if (nameDevice.trim() === '') {
      return;
    } else {
      searchDevice(nameDevice)
        .then((data) => {
          setDeviceList(data.data.data);
        })
        .catch(() => {
          toast.error('Tìm kiếm thiết bị thất bại!', {
            theme: 'colored',
          });
        });
    }
  }, []);

  useEffect(() => {
    handleGetDevice();
  }, []);

  const handleOpenModalDeleteDevice = useCallback((idDeviceDelete) => {
    idDevice.current = idDeviceDelete;
    setOpenModalDeleteDevice(true);
  }, []);

  return (
    <div className="w-screen pb-6 md:w-full">
      <SideBarIntroduces
        title="Devices"
        content="No matter if it has Ethernet, Wifi, or GSM. No problem if it uses HTTP, MQTT, IOTMP, Sigfox, Lora. Almost any device can be connected to the platform."
        contentBtn="Create a Device"
        elementForm={FormCreateDevice}
        handleAddSucess={handleGetDevice}
      />
      <BlockWrapperIntroduce
        title1="Why use Thinger.io to connect your devices?"
        content1={CONTENT1}
        title2="Learn more about devices"
        content2={CONTENT2}
      ></BlockWrapperIntroduce>
      <ListDevices
        handleOpenModalDeleteDevice={handleOpenModalDeleteDevice}
        deviceList={deviceList}
        handleSubmitSearchDevice={handleSubmitSearchDevice}
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
      {/* <div className="mt-4 mr-4 flex justify-end">
        <Pagination></Pagination>
      </div>  */}
      1
    </div>
  );
};

export default Devices;
