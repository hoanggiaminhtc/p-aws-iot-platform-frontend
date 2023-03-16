import { useNavigate } from 'react-router-dom';
const DashBoard = ({
  idDashboard,
  createdTime,
  name,
  onClickHandleOpenModal,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (idDashboard) => {
    navigate(`/dashboard/${idDashboard}`);
  };
  return (
    <tr
      className="cursor-pointer border-b bg-white hover:bg-gray-200"
      onClick={() => {
        handleNavigate(idDashboard);
      }}
    >
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white xs:hidden sm:table-cell"
      >
        {createdTime}
      </th>
      <td className="py-4 px-6 text-black">{name}</td>
      <td className="py-4 text-[#6B6B6B]">
        <div className="flex items-center justify-center text-2xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickHandleOpenModal(idDashboard, 'update');
            }}
            className="mr-4 rounded bg-[#000A3D] px-4 py-[2px] text-base  text-white hover:bg-[#000a3def]"
          >
            Sửa
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickHandleOpenModal(idDashboard, 'delete');
            }}
            className="rounded bg-[#FC2626] px-4 py-[2px] text-base text-white hover:bg-[#fc2626e4]"
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DashBoard;
