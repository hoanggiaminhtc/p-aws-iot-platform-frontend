import React from 'react';

import DashBoardTable from '~/components/DashBoardTable';
import DashBoardCart from '~/components/DashBoardCart';

const ListDashBoardCutom = () => {
  return (
    <div>
      <div className="flex h-10 items-center bg-[#F8F8F8] px-10">
        List Dashboard Custom
      </div>
      <div className="mx-10 grid grid-cols-2 gap-10">
        <div className="flex h-96 items-center justify-center">
          <DashBoardTable />
        </div>
        <div className="flex h-96 items-center justify-center">
          <DashBoardCart></DashBoardCart>
        </div>
      </div>
    </div>
  );
};

export default ListDashBoardCutom;
