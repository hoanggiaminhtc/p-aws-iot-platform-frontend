import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FaListAlt } from 'react-icons/fa';
import DashBoard from './DashBoard';
import FormSearch from '~/components/FormSearch';

const ListDashBoard = ({
  handleOpenModalDashBoard,
  dashBoardList = [],
  handleSubmitSearchDashBoard,
  handleGetDashBoard,
  handleOpenUpdateDashBoard,
}) => {
  return (
    <div>
      <div className="mx-4 flex h-11 items-center bg-[#F6F8F8] pl-2 text-base">
        Dashboard List
        <FaListAlt className="ml-2 text-[#98A6AD]" />
      </div>
      <div className="my-1 flex justify-end">
        <div className="mr-4 w-1/3">
          <FormSearch
            handleSubmit={handleSubmitSearchDashBoard}
            onHandleGet={handleGetDashBoard}
          ></FormSearch>
        </div>
      </div>
      <div className="relative mx-4">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 xs:hidden sm:table-cell">
                Created time
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {dashBoardList.length > 0 &&
              dashBoardList.map((dashBoard, index) => {
                return (
                  <DashBoard
                    key={dashBoard._id}
                    idDashboard={dashBoard._id}
                    createdTime={new Date(
                      dashBoard.createdAt,
                    ).toLocaleDateString('en-GB')}
                    name={dashBoard.name}
                    onClickHandleOpenModal={handleOpenModalDashBoard}
                  />
                );
              })}
          </tbody>
        </table>
        {dashBoardList.length === 0 && (
          <p className="my-4 text-center text-[#000A3D] dark:text-white">
            Không tìm thấy bắt cứ Dashboard nào
          </p>
        )}
      </div>
    </div>
  );
};

ListDashBoard.propTypes = {
  handleOpenModalDeleteDashBoard: PropTypes.func,
  dashBoardList: PropTypes.array,
  handleSubmitSearchDashBoard: PropTypes.func,
  handleGetDashBoard: PropTypes.func,
};

export default memo(ListDashBoard);
