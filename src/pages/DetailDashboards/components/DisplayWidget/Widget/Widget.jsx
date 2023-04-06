import { useEffect, useState, useRef } from 'react';
import { getDevice } from '~/api/deviceApi';
// getDataTopic,
import { getDataLastNDay } from '~/api/telemetryApi';
import LineChart from '~/components/Charts/LineChart';
import DashBoardCart from '~/components/DashBoardCart';
import DashBoardTable from '~/components/DashBoardTable';
import Modal from '~/components/Modal/Modal';
import Notification from '~/components/Notification/Notification';

const SELECT_WIDGET = {
  Card: DashBoardCart,
  Table: DashBoardTable,
  LineChart: LineChart,
};
const Widget = ({
                  type,
                  name,
                  deviceId,
                  onHandleDeleteWidget,
                  height,
                  widgetId,
                  unit,
                }) => {
  const WidgetType = SELECT_WIDGET[type];
  let getDataWidget = useRef();
  const [data, setData] = useState(0);
  const [deviceName, setDeviceName] = useState('Device');
  const [dataInTime, setDataInTime] = useState('0');
  const dateOffset = useRef(60 * 1000 * 5);
  const [modalCopyLink, setModalCopyLink] = useState(false);
  useEffect(() => {
    if (getDataWidget.current) {
      clearInterval(getDataWidget.current);
    }
    getDevice(deviceId).then((data) => {
      setDeviceName(data.data.data.device.name);
    });
    switch (dataInTime) {
      case '0':
        getDataLastNDay({ deviceId: deviceId, date: 1800000 }).then((data) => {
          dateOffset.current = 60 * 1000 * 5;
          setData(data.data.data.telemetry.reverse());
        });
        getDataWidget.current = setInterval(() => {
          getDataLastNDay({ deviceId: deviceId, date: 1800000 }).then(
            (data) => {
              setData(data.data.data.telemetry.reverse());
            },
          );
        }, 2000);
        break;
      case '1h':
        getDataLastNDay({ deviceId: deviceId, date: 3600000 }).then((data) => {
          dateOffset.current = 60 * 1000 * 15;
          setData(data.data.data.telemetry.reverse());
        });
        getDataWidget.current = setInterval(() => {
          getDataLastNDay({ deviceId: deviceId, date: 3600000 }).then(
            (data) => {
              setData(data.data.data.telemetry.reverse());
            },
          );
        }, 3600000);
        break;
      case '1d':
        getDataLastNDay({ deviceId: deviceId, date: 86400000 }).then((data) => {
          dateOffset.current = 60 * 1000 * 360;
          setData(data.data.data.telemetry.reverse());
        });
        getDataWidget.current = setInterval(() => {
          getDataLastNDay({ deviceId: deviceId, date: 86400000 }).then(
            (data) => {
              setData(data.data.data.telemetry.reverse());
            },
          );
        }, 86400000);
        break;
      case '1w':
        getDataLastNDay({ deviceId: deviceId, date: 604800000 }).then(
          (data) => {
            dateOffset.current = 60 * 1000 * 2520;
            setData(data.data.data.telemetry.reverse());
          },
        );
        getDataWidget.current = setInterval(() => {
          getDataLastNDay({ deviceId: deviceId, date: 604800000 }).then(
            (data) => {
              setData(data.data.data.telemetry.reverse());
            },
          );
        }, 604800000);
        break;
      default:
        return;
    }
    return () => {
      clearInterval(getDataWidget.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInTime]);

  const handleChangeDataInTime = (e) => {
    setDataInTime(e.target.value);
  };

  const onHandleShareWidget = () => {
    setModalCopyLink(true);
  };

  return (
    <div
      className={`widget-block relative flex min-w-full items-center justify-center ${height} border-2 border-black p-2 dark:border-red-700 dark:bg-[#DEDFE1]`}
    >
      <WidgetType
        data={data}
        name={name}
        deviceName={deviceName}
        dateOffset={dateOffset.current}
        unit={unit}
      />
      <div className="absolute top-0 right-0 flex gap-1">
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
          // eslint-disable-next-line prettier/prettier
          className="widget-btn-delete cursor-pointer bg-red-600 px-3 py-1 text-xs text-white xs:visible xs:opacity-100 md:invisible md:opacity-0"
          onClick={(e) => {
            e.isPropagationStopped();
            onHandleDeleteWidget();
          }}
        >
          Delete
        </div>
      </div>
      {type !== 'Card' && (
        // eslint-disable-next-line prettier/prettier
        <div className="absolute top-0 left-0 cursor-pointer px-3 py-1 text-xs text-white">
          <select
            name="data-in-day"
            id="data-in-day"
            // eslint-disable-next-line prettier/prettier
            className="w-40 border border-solid border-black py-1 text-black outline-none"
            onChange={handleChangeDataInTime}
          >
            <option value="0">Recently</option>
            <option value="1h">An hour ago</option>
            <option value="1d">A day ago</option>
            <option value="1w">A week ago</option>
          </select>
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

export default Widget;
// flex w-full items-center justify-center