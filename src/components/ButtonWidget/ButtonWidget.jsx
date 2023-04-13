/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { turnOn, turnOff } from '~/api/widgetApi';
import { getDevice } from '~/api/deviceApi';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import Notification from '../Notification/Notification';

const ButtonWidget = ({ widgetId, onHandleDeleteWidget, deviceId }) => {
  const statusBtn = useRef(null);
  const [btn, setBtn] = useState('off');
  const [nameDevice, setNameDevice] = useState('');
  const [modalCopyLink, setModalCopyLink] = useState(false);

  useEffect(() => {
    getDevice(deviceId)
      .then((data) => {
        setNameDevice(data.data.data.device.name);
      })
      .catch(() => {
        toast.error('Lỗi trong quá trình lấy thông tin widget');
      });
  }, [deviceId]);

  const handleClick = () => {
    if (statusBtn.current === 'off') {
      turnOff(widgetId).then((data) => {
        statusBtn.current = 'on';
        localStorage.setItem('stateButton' + widgetId, 'on');
        setBtn(statusBtn.current);
      });
    } else {
      turnOn(widgetId).then((data) => {
        statusBtn.current = 'off';
        localStorage.setItem('stateButton' + widgetId, 'off');
        setBtn(statusBtn.current);
      });
    }
  };

  const onHandleShareWidget = () => {
    setModalCopyLink(true);
  };

  useEffect(() => {
    const stateButton = localStorage.getItem('stateButton' + widgetId);
    statusBtn.current = stateButton || 'off';
    setBtn(statusBtn.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetId]);
  return (
    <div className="widget-block relative h-full px-5">
      <div className="flex h-full w-full flex-col items-center justify-center py-10 dark:text-white">
        <div
          className={`transition-allborder relative h-10 w-20 cursor-pointer rounded-full border-2 border-solid border-gray-500 shadow-2xl ${
            btn === 'on' ? 'bg-blue-500' : 'bg-gray-500'
          }`}
          onClick={handleClick}
        >
          <div
            className={`absolute h-full w-1/2 rounded-full bg-white transition-all ${
              btn === 'on' ? 'left-1/2' : 'left-0'
            }`}
          ></div>
        </div>
        <div className="mt-1">{nameDevice}</div>
      </div>
      {onHandleDeleteWidget && (
        <div className="absolute top-0 right-0 flex items-center gap-1">
          <div
            // eslint-disable-next-line prettier/prettier
            className="widget-btn-delete cursor-pointer bg-blue-600 px-3 py-1 text-xs text-white xs:visible xs:opacity-100 md:invisible md:opacity-0"
            onClick={(e) => {
              e.isPropagationStopped();
              onHandleShareWidget();
            }}
          >
            Share
          </div>
          <div
            className="widget-btn-delete cursor-pointer bg-red-600 px-3 py-1 text-xs text-white xs:visible xs:opacity-100 md:invisible md:opacity-0"
            onClick={(e) => {
              e.isPropagationStopped();
              onHandleDeleteWidget();
            }}
          >
            Delete
          </div>
        </div>
      )}
      {modalCopyLink === true && (
        <Modal>
          <Notification
            success={true}
            btnName="Quay lại trang"
            textTitle="Lấy link share thành công"
            textContent={`Link share : ${
              window.location.origin + '/share/' + widgetId
            }`}
            handleClick={() => {
              setModalCopyLink(false);
            }}
          ></Notification>
        </Modal>
      )}
    </div>
  );
};

export default ButtonWidget;
