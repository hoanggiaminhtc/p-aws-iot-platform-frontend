import { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, name, deviceName }) => {
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
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={dataSet} />;
};

export default PieChart;
