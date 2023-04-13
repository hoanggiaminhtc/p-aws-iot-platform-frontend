import React from 'react';

const DashBoardCart = ({ data, name, unit }) => {
  return (
    <div className="h-full max-h-28 w-full max-w-xs bg-[#FF5722] p-4 shadow-xl">
      <div className="text-3xl font-extrabold text-[#FFBDA8]">{name}</div>
      <div className="text-6xl text-white">
        {data[0]?.value || 0} {unit}
      </div>
    </div>
  );
};

export default DashBoardCart;
