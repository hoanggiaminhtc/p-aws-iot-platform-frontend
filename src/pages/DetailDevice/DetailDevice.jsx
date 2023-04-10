/* eslint-disable prettier/prettier */
import { useEffect, useState, useRef } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { getDevice, updateDevice } from '~/api/deviceApi';
import DetailInfor from '~/components/DetailInfor';
import FormTopic from './components/FormTopic';
import { getGateWayList } from '~/api/gateWayApi';
import Modal from '~/components/Modal';
import Spinner from '~/components/UI/Spinner';

const DetailDevice = () => {
  const [inforDevice, setInforDevice] = useState([]);
  const [gateWay, setGateway] = useState({});
  const [gateWayList, setGateWayList] = useState([]);
  const [checkGatewayRecognition, setCheckGatewayRecognition] = useState(false);
  // const [topicConfi, setTopicConfi] = useState([]);
  const [openModalTopic, setOpenModalTopic] = useState(false);
  let gateWayId = useRef();
  const params = useParams();

  // const handleOpenModalTopic = useCallback(() => {
  //   setOpenModalTopic(true);
  // }, []);
  const handleCloseModalTopic = (e) => {
    e.stopPropagation();
    getDeviceInfor(params.id);
    setOpenModalTopic(false);
  };

  const handleChangeInput = (indexInput, valueInput) => {
    let newArr = [...inforDevice];
    newArr[indexInput].infor = valueInput;
    setInforDevice(newArr);
  };

  const getGatewayListGateWay = (idgateWayDevice) => {
    getGateWayList().then((data) => {
      let gateway = data.data.data.gateway.find(
        (gateway) => gateway._id === idgateWayDevice,
      );
      gateWayId.current = idgateWayDevice;
      gateway = {
        _id: idgateWayDevice,
        name: !gateway ? 'Không có gateway' : gateway.name,
      };
      setGateway(gateway);
      setGateWayList(data.data.data.gateway);
    });
  };

  const getDeviceInfor = (idDevice) => {
    // Lấy dữ liệu device
    getDevice(idDevice)
      .then((data) => {
        const { device } = data.data.data;
        // Lấy dữ liệu gateway
        getGatewayListGateWay(device.gatewayid);
        // Set dữ liệu device
        setInforDevice([
          {
            title: 'Serial number',
            infor: device.serialnumber,
            type: 'input',
            name: 'serialnumber',
          },
          {
            title: 'Device Name',
            infor: device.name,
            type: 'input',
            name: 'name',
          },
          {
            title: 'Type',
            infor: device.type,
            type: 'input',
            name: 'type',
          },
          {
            title: 'Device Description',
            infor: device.description,
            type: 'textarea',
            name: 'description',
          },
          {
            title: 'Create At',
            infor: new Date(device.createdAt).toLocaleDateString('en-GB'),
            type: 'text',
            name: 'createAt',
          },
          {
            title: 'Update At',
            infor: new Date(device.updatedAt).toLocaleDateString('en-GB'),
            type: 'text',
            name: 'updatedAt',
          },
          {
            title: 'Connectstatus',
            infor: device.connectstatus,
            type: 'text',
            name: 'connectstatus',
            color: device.connectstatus === 'Not Connected' ? 'red' : 'green',
          },
        ]);
      })
      .catch((err) => {
        toast.error('Lấy device thất bại');
      });
  };

  const handleUpdateDevice = () => {
    let newUpdateDevice = {};
    inforDevice.forEach((device) => {
      if (
        device.name === 'createAt' ||
        device.name === 'gatewayrecognition' ||
        device.name === 'updatedAt'
      ) {
        return;
      }
      newUpdateDevice[device.name] = device.infor;
    });
    newUpdateDevice.gatewayid = gateWay._id;
    updateDevice(params.id, newUpdateDevice)
      .then((data) => {
        getDeviceInfor(data.data.data.device._id);
        toast.success('Update device thành công');
      })
      .catch((err) => {
        toast.error('Update device thất bại');
      });
  };

  const handleChangeGateWaySelect = (e) => {
    e.preventDefault();
    let newGatewaySelect = gateWayList.find(
      (gateway) => gateway._id === e.target.value,
    );
    newGatewaySelect = {
      _id: newGatewaySelect._id,
      name: newGatewaySelect.name,
    };
    setGateway(newGatewaySelect);
  };

  const handleCheckGatewayRecognition = () => {
    setCheckGatewayRecognition(true);
    getDeviceInfor(params.id);
    setTimeout(() => {
      setCheckGatewayRecognition(false);
    }, 3000);
  };

  useEffect(() => {
    if (params.id) {
      getDeviceInfor(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div className="bg-[#F0F3F4] dark:bg-[#202124]">
      <div>
        <div className="flex h-10 items-center bg-[#F6F8F8] px-3 text-base dark:bg-[#202124] dark:text-white">
          Device Details
        </div>
        <div className="min-h-full w-screen bg-white px-3 dark:bg-[#242526] md:w-full">
          <div className="sm:gridCustom grid grid-cols-1 gap-1">
            <div className="hidden md:block"></div>
            <div className="flex items-center py-5 text-base font-bold leading-5 text-black dark:text-white">
              <FaInfoCircle className="mr-1" />
              Device Information
            </div>
          </div>
          <div className="sm:gridCustom my-4 grid grid-cols-2 text-base">
            <div className="flex items-start justify-start text-black dark:text-white sm:justify-end">
              <div className="flex items-center font-bold sm:font-normal">
                Gateway Name
                <FaInfoCircle className="ml-1 hidden sm:block" />
              </div>
            </div>
            <select
              name="cars"
              id="cars"
              onChange={handleChangeGateWaySelect}
              className="w-full dark:bg-[#242526] dark:text-white"
            >
              <option value={gateWay._id}>{gateWay.name}</option>
              {gateWayList.length > 0 &&
                gateWayList?.map((gateway) => {
                  return (
                    <option value={gateway._id} key={gateway._id}>
                      {gateway.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {inforDevice.map((infor, index) => {
            return (
              <DetailInfor
                key={index}
                indexInput={index}
                title={infor.title}
                infor={infor.infor}
                type={infor.type}
                handleChangeInput={handleChangeInput}
                color={infor.color ? infor.color : false}
              />
            );
          })}
          <div className="mt-14 w-full justify-end sm:flex">
            <div
              className="mb-4 cursor-pointer rounded-sm bg-blue-700 px-5 py-2 text-center text-white hover:bg-blue-800 sm:mb-0 sm:mr-2 sm:w-auto"
              onClick={() => {
                window.open('http://192.168.4.1/');
              }}
            >
              Open Wifi Config
            </div>
            <div
              className="mb-4 cursor-pointer rounded-sm bg-[#D91E1E] px-5 py-2 text-center text-white hover:bg-[#d91e1eee] sm:mb-0 sm:mr-2 sm:w-auto"
              onClick={handleCheckGatewayRecognition}
            >
              Check Connection
            </div>
            <div
              className="cursor-pointer rounded-sm bg-[#000A3D] px-5 py-2 text-center text-white hover:bg-[#000a3de1] sm:w-auto"
              onClick={handleUpdateDevice}
            >
              Update Device
            </div>
          </div>
          {openModalTopic && (
            <FormTopic
              handleCloseModalTopic={handleCloseModalTopic}
              idDevice={params.id}
              gatewayId={gateWayId.current}
            />
          )}
          {checkGatewayRecognition && (
            <Modal>
              <Spinner />
              <div className="text-lg font-semibold text-white shadow-xl">
                Check Device Connect to Gateway...
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailDevice;