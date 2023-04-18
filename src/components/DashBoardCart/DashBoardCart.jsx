/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getDataTopic } from '~/api/telemetryApi';

const DashBoardCart = ({ name, unit, deviceId }) => {
  const [data, setData] = useState(0);

  useEffect(() => {
    let getData = setInterval(() => {
      getDataTopic(deviceId).then((data) => {
        setData(data.data.data.telemetry[0]);
      });
    }, [500]);
    return () => {
      clearInterval(getData);
    };
  }, []);

  return (
    <div className="h-full max-h-28 w-full max-w-xs bg-[#FF5722] p-4 shadow-xl">
      <div className="text-3xl font-extrabold text-[#FFBDA8]">{name}</div>
      <div className="text-6xl text-white">
        {data?.value || 0} {unit}
      </div>
    </div>
  );
};

export default DashBoardCart;
