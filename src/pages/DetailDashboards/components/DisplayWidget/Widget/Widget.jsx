import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { getDevice } from '~/api/deviceApi';
// getDataTopic,
import { getDataLastNDay } from '~/api/telemetryApi';
import LineChart from '~/components/Charts/LineChart';
import DashBoardCart from '~/components/DashBoardCart';
import DashBoardTable from '~/components/DashBoardTable';

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
        }, 5000);
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
    navigator.clipboard.writeText(
      window.location.origin + `/share/${widgetId}`,
    );
    toast.success('Copy link share thành công');
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
          className="px-3 py-1 text-xs text-white bg-blue-600 cursor-pointer widget-btn-delete xs:visible xs:opacity-100 md:invisible md:opacity-0"
          onClick={(e) => {
            e.isPropagationStopped();
            onHandleShareWidget();
          }}
        >
          Share
        </div>
        <div
          // eslint-disable-next-line prettier/prettier
          className="px-3 py-1 text-xs text-white bg-red-600 cursor-pointer widget-btn-delete xs:visible xs:opacity-100 md:invisible md:opacity-0"
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
        <div className="absolute top-0 left-0 px-3 py-1 text-xs text-white cursor-pointer">
          <select
            name="data-in-day"
            id="data-in-day"
            // eslint-disable-next-line prettier/prettier
            className="w-40 py-1 text-black border border-black border-solid outline-none"
            onChange={handleChangeDataInTime}
          >
            <option value="0">Recently</option>
            <option value="1h">An hour ago</option>
            <option value="1d">A day ago</option>
            <option value="1w">A week ago</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Widget;
// flex w-full items-center justify-center
