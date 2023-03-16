import React, { useEffect, useRef, useState } from 'react';
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
// import { useRef } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.color = '#000000';
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
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: 'Minute',
      },
    },
    y: {
      grid: {
        display: false,
        text: 'Data device',
      },
      title: {
        display: true,
        text: 'Data device',
      },
    },
  },
  maintainAspectRatio: false,
};

const LineChart = ({ data, name, deviceName }) => {
  options.plugins.title.text = deviceName;
  // const labdelsRef = useRef([new Date().getMinutes()]);
  // const dataRef = useRef([0]);
  // if (labdelsRef.current.length > 5) {
  //   labdelsRef.current.shift();
  // }
  // labdelsRef.current.push(new Date().getMinutes());
  // if (dataRef.current.length > 5) {
  //   dataRef.current.shift();
  // }
  // dataRef.current.push(data);
  // let labels = [...labdelsRef.current, ''];
  // let dataSet = {
  //   labels,
  //   datasets: [
  //     {
  //       label: name,
  //       data: [...dataRef.current],
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ],
  // };
  let listData = useRef();

  const [dataSet, setDataSet] = useState();
  useEffect(() => {
    listData.current =
      data === 0
        ? [0, 0, 0, 0, 0]
        : data.map((value) => {
            return value.value;
          });
    let labels =
      data === 0
        ? [
            new Date().getMinutes(),
            new Date().getMinutes(),
            new Date().getMinutes(),
            new Date().getMinutes(),
            new Date().getMinutes(),
          ]
        : data.map((value) => {
            return new Date(value.createdAt).getMinutes();
          });
    setDataSet({
      labels,
      datasets: [
        {
          label: name,
          data: [...listData.current],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.3,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="relative h-full w-full">
      {dataSet && (
        <>
          <div className="absolute left-[50%] top-[20px] translate-x-[-50%] text-base">
            Data : {listData.current[listData.current.length - 1]}
          </div>
          <Line
            options={options}
            data={dataSet}
            width={'100%'}
            height={'100%'}
          />
        </>
      )}
    </div>
  );
};

export default LineChart;
