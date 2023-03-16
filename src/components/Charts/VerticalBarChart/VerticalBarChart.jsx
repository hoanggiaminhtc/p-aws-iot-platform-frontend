import { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Vertical Bar Chart',
    },
  },
};

const VerticalBarChart = ({ data, name, deviceName }) => {
  const labdelsRef = useRef([new Date().getMinutes()]);
  const dataRef = useRef([0]);
  if (labdelsRef.current.length > 5) {
    labdelsRef.current.shift();
  }
  labdelsRef.current.push(new Date().getMinutes());
  if (dataRef.current.length > 5) {
    dataRef.current.shift();
  }
  dataRef.current.push(data);
  let labels = [...labdelsRef.current, ''];
  let dataSet = {
    labels,
    datasets: [
      {
        label: name,
        data: [...dataRef.current],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={dataSet} />;
};

export default VerticalBarChart;
