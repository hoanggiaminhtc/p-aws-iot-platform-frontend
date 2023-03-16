import React from 'react';

const DashBoardTable = ({ data, name, deviceName }) => {
  return (
    <div className="w-full overflow-x-auto shadow-xl sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">
              Device name
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">{name}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white  ">
            <th
              scope="row"
              className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
            >
              {deviceName}
            </th>
            <td className="py-4 px-6 text-center">{data}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardTable;
