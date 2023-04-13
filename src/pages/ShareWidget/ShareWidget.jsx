/* eslint-disable prettier/prettier */
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDevice } from '~/api/deviceApi';
import { getDataLastNDay } from '~/api/telemetryApi';
import { getOneWidget } from '~/api/widgetApi';
import ButtonWidget from '~/components/ButtonWidget/ButtonWidget';
import LineChart from '~/components/Charts/LineChart';
// import DoughnutChart from '~/components/Charts/DoughnutChart';
// import PieChart from '~/components/Charts/PieChart';
// import VerticalBarChart from '~/components/Charts/VerticalBarChart';
import DashBoardCart from '~/components/DashBoardCart';
import DashBoardTable from '~/components/DashBoardTable';
// import socketClient from '~/socketClient/socketClient';

const SELECT_WIDGET = {
  Card: DashBoardCart,
  Table: DashBoardTable,
  LineChart: LineChart,
};
const ShareWidget = () => {
  const params = useParams();

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const dateOffset = useRef(60 * 1000 * 5);

  const WidgetType = SELECT_WIDGET[type] || '';
  let getDataWidget = useRef();
  const [data, setData] = useState(0);
  const [deviceName, setDeviceName] = useState('Device');
  const [dataInTime, setDataInTime] = useState('0');
  const [unit, setUnit] = useState('');
  useEffect(() => {
    if (type !== 'button' && type !== 'Card' && name && deviceId) {
      if (getDataWidget.current) {
        clearInterval(getDataWidget.current);
      }
      getDevice(deviceId).then((data) => {
        setDeviceName(data.data.data.device.name);
      });
      switch (dataInTime) {
        case '0':
          getDataLastNDay({ deviceId: deviceId, date: 1800000 }).then(
            (data) => {
              dateOffset.current = 60 * 1000 * 5;
              setData(data.data.data.telemetry.reverse());
            },
          );
          getDataWidget.current = setInterval(() => {
            getDataLastNDay({ deviceId: deviceId, date: 1800000 }).then(
              (data) => {
                setData(data.data.data.telemetry.reverse());
              },
            );
          }, 2000);
          break;
        case '1h':
          getDataLastNDay({ deviceId: deviceId, date: 3600000 }).then(
            (data) => {
              dateOffset.current = 60 * 1000 * 15;
              setData(data.data.data.telemetry.reverse());
            },
          );
          getDataWidget.current = setInterval(() => {
            console.log('Case 1h');
            getDataLastNDay({ deviceId: deviceId, date: 3600000 }).then(
              (data) => {
                setData(data.data.data.telemetry.reverse());
              },
            );
          }, 3600000);
          break;
        case '1d':
          getDataLastNDay({ deviceId: deviceId, date: 86400000 }).then(
            (data) => {
              dateOffset.current = 60 * 1000 * 360;
              setData(data.data.data.telemetry.reverse());
            },
          );
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
    }
    return () => {
      clearInterval(getDataWidget.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInTime, deviceId]);

  const handleChangeDataInTime = (e) => {
    setDataInTime(e.target.value);
  };

  useEffect(() => {
    getOneWidget(params.id)
      .then((data) => {
        setType(data.data.data.type);
        setName(data.data.data.name);
        setDeviceId(data.data.data.device_id);
        setUnit(data.data.data.unit);
      })
      .catch((err) => {
        toast.error('Có lỗi trong quá trình lấy dữ liệu');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`widget-block relative flex h-screen w-full items-center justify-center border-2 border-black p-2 dark:border-red-700 dark:bg-black`}
    >
      {WidgetType === '' ? (
        ''
      ) : (
        <WidgetType
          data={data}
          name={name}
          deviceName={deviceName}
          dateOffset={dateOffset.current}
          unit={unit}
        />
      )}
      {type !== 'Card' && type !== 'button' && (
        <div className="absolute top-0 left-0 cursor-pointer px-3 py-1 text-xs text-white">
          <select
            name="data-in-day"
            id="data-in-day"
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
      {type === 'button' && (
        <div className="max-w-[10%]">
          <ButtonWidget deviceId={deviceId} widgetId={params.id} />
        </div>
      )}
    </div>
  );
};

export default ShareWidget;
