/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
// import { useRef } from 'react';

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.color = '#000000';
ChartJS.defaults.borderColor = '#000000';
ChartJS.defaults.font.size = 14;

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Line Chart',
      color: '#000A3D',
    },
    colors: {
      forceOverride: true,
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'xy',
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: false,
      },
      // ticks: {
      //   display: false,
      // },
      reverse: true,
    },
    y: {
      grid: {
        display: false,
      },
      title: {
        display: true,
      },
    },
  },
  maintainAspectRatio: false,
};

const deduplicate = (arr) => {
  let dubplicate = [];
  let isExit = (element) => {
    if (dubplicate.includes(element.date)) {
      return true;
    } else {
      dubplicate.unshift(element.date);
      return false;
    }
  };
  let ans = [];
  arr.forEach((element) => {
    if (!isExit(element)) ans.push(element);
  });
  return ans;
};

const TIME_A_WEEK = 151200000;

const LineChart = ({ data, name, deviceName, dateOffset, unit }) => {
  options.plugins.title.text = deviceName;
  let listData = useRef();

  const [dataSet, setDataSet] = useState();
  useEffect(() => {
    let listDataCurren = [];
    if (data !== 0) {
      if (dateOffset === TIME_A_WEEK) {
        listDataCurren = data.map((value) => ({
          value: value.value,
          date: new Date(value.createdAt).toLocaleString(),
        }));
      } else {
        listDataCurren = data.map((value) => ({
          value: value.value,
          date: new Date(value.createdAt).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
      }
      listDataCurren = deduplicate(listDataCurren);
    }

    listData.current =
      listDataCurren.length === 0
        ? [0, 0, 0, 0, 0]
        : listDataCurren.map((value) => {
            return value.value;
          });
    listData.current = [...listData.current.reverse()];
    let labels =
      listDataCurren.length === 0
        ? // eslint-disable-next-line no-sparse-arrays
          [
            new Date(new Date() - dateOffset * 4).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            new Date(new Date() - dateOffset * 3).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            new Date(new Date() - dateOffset * 2).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            new Date(new Date() - dateOffset).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            new Date().toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            ,
          ]
        : listDataCurren.map((value) => {
            return value.date;
          });
    if (data && data.length > 0) {
      if (new Date(data[0].createdAt) > new Date(new Date() - dateOffset * 4)) {
        if (dateOffset === TIME_A_WEEK) {
          labels.unshift(
            new Date(new Date() - dateOffset * 4).toLocaleString(),
          );
        } else {
          labels.unshift(
            new Date(new Date() - dateOffset * 4).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          );
        }
      }
    }
    labels = [...labels.reverse()];
    setDataSet({
      labels,
      datasets: [
        {
          label: name,
          data: [...listData.current],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // let labelSub = useMemo(() => {
  //   // eslint-disable-next-line no-sparse-arrays
  //   return [
  //     new Date(new Date() - dateOffset * 4).toLocaleTimeString('en-GB', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     }),
  //     new Date(new Date() - dateOffset * 3).toLocaleTimeString('en-GB', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     }),
  //     new Date(new Date() - dateOffset * 2).toLocaleTimeString('en-GB', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     }),
  //     new Date(new Date() - dateOffset).toLocaleTimeString('en-GB', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     }),
  //     new Date().toLocaleTimeString('en-GB', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     }),
  //     ,
  //   ];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);
  const displayUnitTime = useMemo(() => {
    if (dateOffset === TIME_A_WEEK) {
      return '(Day : Hour : Minute)';
    } else {
      return '(Hour:Minute)';
    }
  }, [dateOffset]);

  return (
    // eslint-disable-next-line prettier/prettier
    <div className="relative h-full w-full pb-3">
      {dataSet && (
        <>
          <div className="absolute left-[50%] top-[20px] translate-x-[-50%] text-base">
            Data : {listData.current[0]}
          </div>
          <Line
            options={options}
            data={dataSet}
            width={'100%'}
            height={'100%'}
          />
        </>
      )}
      <div className="absolute left-0 top-[50%] translate-y-[-50%]">{unit}</div>
      <div className="absolute left-[50%] bottom-[-5px] translate-x-[-50%]">
        Time -{displayUnitTime}
      </div>
    </div>
  );
};

export default LineChart;
