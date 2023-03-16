import { useNavigate } from 'react-router-dom';
const DataBucket = ({
  idBucket,
  createdTime,
  name,
  dataSource,
  onClickHandleOpenModal,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (idBucket) => {
    navigate(`/bucket/${idBucket}`);
  };
  return (
    <tr
      className="cursor-pointer border-b bg-white hover:bg-gray-200"
      onClick={() => {
        handleNavigate(idBucket);
      }}
    >
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white xs:hidden md:table-cell"
      >
        {createdTime}
      </th>
      <td className="py-4 px-6 text-black">{idBucket}</td>
      <td className="py-4 px-6 text-black">{name}</td>
      <td className="py-4 px-6 text-black xs:hidden sm:table-cell">
        {dataSource}
      </td>
      <td className="py-4 text-[#6B6B6B]">
        <div className="flex items-center justify-center text-2xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickHandleOpenModal(idBucket);
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

export default DataBucket;
