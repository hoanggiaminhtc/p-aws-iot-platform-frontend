import React from 'react';

import LineChart from '~/components/Charts/LineChart';
import PieChart from '~/components/Charts/PieChart';
import DoughnutChart from '~/components/Charts/DoughnutChart';
import VerticalBarChart from '~/components/Charts/VerticalBarChart';

const ListChart = () => {
  return (
    <div>
      <div className="flex h-10 items-center bg-[#F8F8F8] px-10">
        List Charts
      </div>
      <div className="mx-10 grid grid-cols-2 gap-10">
        <div className="flex h-96 items-center justify-center">
          <LineChart />
        </div>
        <div className="flex h-96 items-center justify-center">
          <PieChart />
        </div>
        <div className="flex h-96 items-center justify-center">
          <DoughnutChart />
        </div>
        <div className="flex h-96 items-center justify-center">
          <VerticalBarChart />
        </div>
      </div>
    </div>
  );
};

export default ListChart;
