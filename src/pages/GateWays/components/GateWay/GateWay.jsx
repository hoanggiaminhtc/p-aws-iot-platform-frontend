import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteGateWay } from '~/api/gateWayApi';
// import GatewaysImg from '~/assets/image/gateways.png';
// import GatewayImg from '~/assets/image/Gateway.png';
import { TbRouter } from 'react-icons/tb';

const GateWay = ({ getway, getRepeatGetWay, timeDelay }) => {
  const [openBtnDelete, setOpenBtnDelete] = useState(false);
  // const [openModalDelete, setOpenModalDelete] = useState(false);

  // const handleOpenModalDelete = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setOpenModalDelete(true);
  // };

  const handleDeleteGateWay = (idGateWay) => {
    deleteGateWay(idGateWay)
      .then((data) => {
        toast.success('Xóa gateway thành công');
        getRepeatGetWay();
      })
      .catch((err) => {
        toast.error('Xóa gateway thất bại');
      });
  };

  return (
    <Link
      to={`/gateways/${getway._id}`}
      style={{ animationDuration: timeDelay + 's' }}
      className="animationToTop gateway relative max-w-sm cursor-default rounded-lg border-2 border-gray-500 bg-white shadow hover:border-black dark:bg-black dark:hover:border-white"
    >
      <div className="mt-4 flex justify-center">
        <TbRouter className="text-7xl dark:text-white sm:text-8xl" />
      </div>
      <div>
        <div>
          <h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-500 dark:text-white">
            {getway.name}
          </h5>
        </div>
      </div>
      <div className="absolute top-1 right-2 cursor-pointer">
        <BsThreeDots
          className="dark:text-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenBtnDelete((pre) => !pre);
          }}
        />
        {openBtnDelete && (
          <div
            className="animationModal2 absolute right-[-8px] cursor-pointer bg-red-200 px-3 py-1 text-xs hover:bg-red-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteGateWay(getway._id);
            }}
          >
            Delete
          </div>
        )}
      </div>
    </Link>
  );
};

export default GateWay;
