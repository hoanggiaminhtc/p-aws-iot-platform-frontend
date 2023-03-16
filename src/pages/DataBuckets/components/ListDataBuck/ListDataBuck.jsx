import React from 'react';
import { FaListAlt } from 'react-icons/fa';
import DataBucket from './DataBucket';

const ListDataBuck = ({ handleOpenModal, dataBucketList = [] }) => {
  return (
    <div>
      <div className="mx-4 flex h-11 items-center bg-[#F6F8F8] pl-2 text-base">
        Dashboard List
        <FaListAlt className="ml-2 text-[#98A6AD]" />
      </div>
      <div className="relative mx-4 pb-4">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 xs:hidden md:table-cell">
                Created time
              </th>
              <th scope="col" className="py-3 px-6">
                Bucket
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6 xs:hidden sm:table-cell">
                Data Source
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {dataBucketList.length > 0 &&
              dataBucketList.map((databuck, index) => {
                return (
                  <DataBucket
                    key={databuck._id}
                    idBucket={databuck._id}
                    createdTime={new Date(
                      databuck.createdAt,
                    ).toLocaleDateString('en-GB')}
                    name={databuck.name}
                    dataSource={databuck.dataSource}
                    onClickHandleOpenModal={handleOpenModal}
                  />
                );
              })}
          </tbody>
        </table>
        {dataBucketList.length === 0 && (
          <p className="my-4 text-center text-[#000A3D]">
            Không tìm thấy bắt cứ Data Bucket nào
          </p>
        )}
      </div>
    </div>
  );
};

export default ListDataBuck;
