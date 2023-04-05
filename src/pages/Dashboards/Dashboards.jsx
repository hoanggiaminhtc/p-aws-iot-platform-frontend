// import { useCallback, useEffect, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  // deleteDashBoard,
  getAllDashBoard,
  // updateDashBoard,
} from '~/api/dashBoardApi';
// import Dialog from '~/components/Dialog';
import FormCreateDashBoard from './components/FormCreateDashBoard';
// import ListDashBoard from '~/components/ListDashBoard';
import SideBarIntroduces from '~/components/SideBarIntroduces';

const Dashboards = () => {
  const navigate = useNavigate();
  // const [openModalDeleteDashBoard, setOpenModalDeleteDashBoard] =
  //   useState(false);
  // const [openModalUpdateDashBoard, setOpenModalUpdateDashBoard] =
  //   useState(false);
  // eslint-disable-next-line no-unused-vars
  // const [dashBoardList, setDashBoardList] = useState([]);
  // const idDashBoard = useRef();

  // const handleSubmitSearchDashBoard = () => {};
  const handleGetDashBoard = () => {
    getAllDashBoard()
      .then((data) => {
        if (data.data.data.dashboard.length > 0) {
          navigate('/dashboard/all');
        }
        // setDashBoardList(data.data.data.dashboard);
      })
      .catch((err) => {
        toast.error('Lấy dữ liệu Dashboard thất bại');
      });
  };
  // const handleOpenModalDasboard = useCallback((idDashBoardCurren, type) => {
  //   idDashBoard.current = idDashBoardCurren;
  //   if (type === 'delete') {
  //     setOpenModalDeleteDashBoard(true);
  //   } else {
  //     setOpenModalUpdateDashBoard(true);
  //   }
  // }, []);

  // const handleCloseModalDasboard = useCallback((type) => {
  //   if (type === 'delete') {
  //     setOpenModalDeleteDashBoard(false);
  //   } else {
  //     setOpenModalUpdateDashBoard(false);
  //   }
  // }, []);
  //Lấy tên dashboard từ id đã cho biết trước để sửa thông tin dashboard
  // const getNameDashBoard = () => {
  //   const getName = dashBoardList.find(
  //     (dashBoard) => dashBoard._id === idDashBoard.current,
  //   );
  //   return getName.name;
  // };
  //Xử lý xóa dashboard
  // const handleDeleteDashboard = () => {
  //   deleteDashBoard(idDashBoard.current)
  //     .then((data) => {
  //       let newDashBoardList = dashBoardList.filter(
  //         (dashboard) => dashboard._id !== idDashBoard.current,
  //       );
  //       setDashBoardList(newDashBoardList);
  //       toast.success('Xóa dashboard thành công!', {
  //         theme: 'colored',
  //       });
  //     })
  //     .catch(() => {
  //       toast.error('Xóa dashboard thất bại!', {
  //         theme: 'colored',
  //       });
  //     })
  //     .finally(() => {
  //       idDashBoard.current = null;
  //       setOpenModalDeleteDashBoard(false);
  //     });
  // };

  // const handleUpdateDashboard = (newName) => {
  //   updateDashBoard(idDashBoard.current, { name: newName })
  //     .then((data) => {
  //       handleGetDashBoard();
  //       toast.success('Update dashboard thành công!', {
  //         theme: 'colored',
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error('Update dashboard thất bại!', {
  //         theme: 'colored',
  //       });
  //     });
  // };
  useEffect(() => {
    handleGetDashBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pb-5">
      <SideBarIntroduces
        title="Dashboards"
        content="A dashboard is a data visualization tool that transforms, displays, and organizes a collection of data captured and transmitted by IoT devices."
        contentBtn="Create a Dashboard"
        handleAddSucess={handleGetDashBoard}
        elementForm={FormCreateDashBoard}
      />
    </div>
  );
};

export default Dashboards;
