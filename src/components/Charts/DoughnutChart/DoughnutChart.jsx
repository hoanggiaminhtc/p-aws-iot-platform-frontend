import { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, name, deviceName }) => {
  const dataRef = useRef([0]);
  if (dataRef.current.length > 5) {
    dataRef.current.shift();
  }
  dataRef.current.push(data);
  const labels = [name, 'Remaining'];
  let dataSet = {
    labels,
    datasets: [
      {
        label: name,
        data: [data, 100 - data],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={dataSet} />;
};

export default DoughnutChart;
