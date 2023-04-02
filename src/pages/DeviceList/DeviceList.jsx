import React, { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Dialog from '~/components/Dialog';
import { getDevices, deleteDevice } from '~/api/deviceApi';
import ListDevices from '../Devices/components/ListDevices';
import { useParams } from 'react-router-dom';
import { getGateWayList, updateGateway } from '~/api/gateWayApi';
import FormCreateDevice from '../Devices/components/FormCreateDevice';
import { FaInfoCircle, FaListAlt } from 'react-icons/fa';
import DetailInfor from '~/components/DetailInfor';
import Modal from '~/components/Modal';
import Spinner from '~/components/UI/Spinner';

const DeviceList = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [gatewayName, setGatewayName] = useState();
  const [inforGateway, setInforGateway] = useState([]);
  const [checkConnection, setCheckConnection] = useState(false);
  const [openModalCreateNewDevice, setOpenModalCreateNewDevice] =
    useState(false);
  const [openModalDeleteDevice, setOpenModalDeleteDevice] = useState(false);

  const idDevice = useRef(null);

  const handleCloseModalDeleteDevice = () => {
    setOpenModalDeleteDevice(false);
  };

  const { id } = useParams();

  const handleGetDevice = (id) => {
    let idGateway = id === 'other' ? 'other' : id;

    getDevices(idGateway)
      .then((data) => {
        if (data.data.data.gatewayinfo.length > 0) {
          setInforGateway([
            {
              title: 'Gateway Name',
              infor: data.data.data.gatewayinfo[0].name,
              type: 'input',
              name: 'name',
            },
            {
              title: 'Gateway Description',
              infor: data.data.data.gatewayinfo[0].description,
              type: 'textarea',
              name: 'description',
            },
            {
              title: 'Created At',
              infor: new Date(
                data.data.data.gatewayinfo[0].createdAt,
              ).toLocaleDateString('en-GB'),
              type: 'text',
              name: 'createdAt',
            },
            {
              title: 'Serial Number',
              infor: data.data.data.gatewayinfo[0].serialnumber,
              type: 'input',
              name: 'serialnumber',
            },
            {
              title: 'Connect Status',
              infor: data.data.data.gatewayinfo[0].connectstatus,
              type: 'text',
              name: 'connectstatus',
              color: 'red',
            },
          ]);
        }
        setDeviceList(data.data.data.deviceinfo);
      })
      .catch((err) => {
        toast.error('Có lỗi trong quá trình lấy thiết bị!');
      });
  };

  const handleGetGateway = () => {
    getGateWayList()
      .then((data) => {
        let gateway = data.data.data.gateway.find((value) => value._id === id);
        gateway = gateway ? gateway.name : 'Other';
        setGatewayName(gateway);
      })
      .catch(() => {
        toast.error('Có lỗi trong quá trình lấy gateway!', {
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

  const handleUpdateGateway = () => {
    const updateInforGateway = {};
    inforGateway.forEach((gateway) => {
      if (gateway.name === 'connectstatus' || gateway.name === 'createdAt') {
        return;
      }
      updateInforGateway[gateway.name] = gateway.infor;
    });
    updateGateway(id, updateInforGateway)
      .then((data) => {
        toast.success('Update Gateway success');
      })
      .catch(() => {
        toast.error('Update Gateway failure');
      });
  };

  const handleChangeInput = (indexInput, valueInput) => {
    let newArr = [...inforGateway];
    newArr[indexInput].infor = valueInput;
    setInforGateway(newArr);
  };

  const handleCheckConnectionGateway = () => {
    setCheckConnection(true);
    setTimeout(() => {
      getDevices(id)
        .then((data) => {
          if (data.data.data.gatewayinfo.length > 0) {
            setInforGateway([
              {
                title: 'Gateway Name',
                infor: data.data.data.gatewayinfo[0].name,
                type: 'input',
                name: 'name',
              },
              {
                title: 'Gateway Description',
                infor: data.data.data.gatewayinfo[0].description,
                type: 'textarea',
                name: 'description',
              },
              {
                title: 'Created At',
                infor: new Date(
                  data.data.data.gatewayinfo[0].createdAt,
                ).toLocaleDateString('en-GB'),
                type: 'text',
                name: 'createdAt',
              },
              {
                title: 'Serial Number',
                infor: data.data.data.gatewayinfo[0].serialnumber,
                type: 'input',
                name: 'serialnumber',
              },
              {
                title: 'Connect Status',
                infor: data.data.data.gatewayinfo[0].connectstatus,
                type: 'text',
                name: 'connectstatus',
                color: 'red',
              },
            ]);
          }
        })
        .catch((err) => {
          toast.error('Kiểm tra connection thất bại!');
        })
        .finally(() => {
          setCheckConnection(false);
        });
    }, 3000);
  };

  useEffect(() => {
    if (id) {
      handleGetGateway();
      handleGetDevice(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="dark:bg-[#242526]">
      <div className="flex h-12 items-center bg-[#F8F8F8] pl-4 capitalize text-[##333333] dark:bg-[#202124] dark:text-white">
        {`Gateways/${gatewayName}`}
      </div>
      {inforGateway.length > 0 && (
        <div className="min-h-[85vh] pb-5">
          <div className="flex h-11 items-center bg-[#F6F8F8] px-4 text-base dark:bg-[#202124] dark:text-white">
            Gateway Details
            <FaListAlt className="ml-2 text-[#98A6AD]" />
          </div>
          <div className="min-h-full w-screen bg-white px-3 dark:bg-[#242526] md:w-full">
            <div className="sm:gridCustom grid grid-cols-1 gap-1">
              <div className="hidden md:block"></div>
              <div className="flex items-center py-5 text-base font-bold leading-5 text-black dark:text-white">
                <FaInfoCircle className="mr-1" />
                Gateway Information
              </div>
            </div>
            {inforGateway?.map((infor, index) => {
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

            <div className="mt-14 w-full justify-end gap-2 sm:flex">
              <div
                className="h-auto w-auto cursor-pointer rounded-sm bg-red-600 px-5 py-2 text-center text-white hover:bg-red-700"
                onClick={handleCheckConnectionGateway}
              >
                Check Connection Gateway
              </div>
              {checkConnection && (
                <Modal>
                  <Spinner />
                  <div className="text-lg font-semibold text-white shadow-xl">
                    Check Connection Gateway...
                  </div>
                </Modal>
              )}
              <div
                className="h-auto w-auto cursor-pointer rounded-sm bg-[#000A3D] px-5 py-2 text-center text-white hover:bg-[#000a3de1]"
                onClick={handleUpdateGateway}
              >
                Update Gateway
              </div>
            </div>
          </div>
        </div>
      )}
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
      <button
        onClick={() => {
          setOpenModalCreateNewDevice(true);
        }}
        className={`fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#D91E1E] p-1 text-4xl
          text-white`}
      >
        +
      </button>
      {openModalCreateNewDevice && (
        <FormCreateDevice
          handleClickCLoseModal={() => setOpenModalCreateNewDevice(false)}
          handleAddSucess={() => handleGetDevice(id)}
          gatewayId={id}
        />
      )}
    </div>
  );
};

export default DeviceList;
