import { useEffect, useState, useRef } from 'react';
import { getDevice } from '~/api/deviceApi';
import { getDataTopic, getDataLastNDay } from '~/api/telemetryApi';
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
const Widget = ({
  topicId,
  type,
  name,
  deviceId,
  onHandleDeleteWidget,
  height,
}) => {
  const WidgetType = SELECT_WIDGET[type];
  let getDataWidget = useRef();
  const [data, setData] = useState(0);
  const [deviceName, setDeviceName] = useState('Device');
  const [dataInTime, setDataInTime] = useState('0');
  useEffect(() => {
    if (getDataWidget.current) {
      clearInterval(getDataWidget.current);
    }
    getDevice(deviceId).then((data) => {
      setDeviceName(data.data.data.device.name);
    });
    switch (dataInTime) {
      case '0':
        getDataTopic(topicId).then((data) => {
          setData(data.data.data.telemetry.reverse());
        });
        getDataWidget.current = setInterval(() => {
          getDataTopic(topicId).then((data) => {
            setData(data.data.data.telemetry.reverse());
          });
        }, 1000);
        return;
      case '1h':
        getDataLastNDay({ topic: topicId, date: 3600000 }).then((data) => {
          setData(data.data.data.telemetry.reverse());
        });
        getDataWidget.current = setInterval(() => {
          getDataLastNDay({ topic: topicId, date: 3600000 }).then((data) => {
            setData(data.data.data.telemetry.reverse());
          });
        }, 3600000);
        return;
      case '1d':
        getDataLastNDay({ topic: topicId, date: 86400000 }).then((data) => {
          setData(data.data.data.telemetry.reverse());
        });
        getDataWidget.current = setInterval(() => {
          getDataLastNDay({ topic: topicId, date: 86400000 }).then((data) => {
            setData(data.data.data.telemetry.reverse());
          });
        }, 86400000);
        return;
      case '3d':
        getDataLastNDay({ topic: topicId, date: 86400000 * 3 }).then((data) => {
          setData(data.data.data.telemetry.reverse());
        });
        getDataWidget.current = setInterval(() => {
          getDataLastNDay({ topic: topicId, date: 86400000 * 3 }).then(
            (data) => {
              setData(data.data.data.telemetry.reverse());
            },
          );
        }, 86400000 * 3);
        return;
      default:
        return;
    }
    // eslint-disable-next-line no-unreachable
    return () => {
      clearInterval(getDataWidget.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInTime]);

  const handleChangeDataInTime = (e) => {
    setDataInTime(e.target.value);
  };

  return (
    <div
      className={`widget-block relative flex w-full items-center justify-center ${height} border border-black p-2`}
    >
      <WidgetType data={data} name={name} deviceName={deviceName} />
      <div
        className="widget-btn-delete absolute top-0 right-0 cursor-pointer bg-red-600 py-1 px-3 text-xs text-white xs:visible xs:opacity-100 md:invisible md:opacity-0"
        onClick={(e) => {
          e.isPropagationStopped();
          onHandleDeleteWidget();
        }}
      >
        Delete
      </div>
      <div className="absolute top-0 left-0 cursor-pointer py-1 px-3 text-xs text-white">
        <select
          name="data-in-day"
          id="data-in-day"
          className="w-40 border border-solid border-black py-1 text-black outline-none"
          onChange={handleChangeDataInTime}
        >
          <option value="0">Recently</option>
          <option value="1h">An hour ago</option>
          <option value="1d">A day ago</option>
          <option value="3d">Three days ago</option>
        </select>
      </div>
    </div>
  );
};

export default Widget;
// flex w-full items-center justify-center
