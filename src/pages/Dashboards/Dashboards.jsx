import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllDashBoard } from '~/api/dashBoardApi';
import SideBarIntroduces from '~/components/SideBarIntroduces';
import FormCreateDashBoard from './components/FormCreateDashBoard';

const Dashboards = () => {
  const navigate = useNavigate();
  const handleGetDashBoard = () => {
    getAllDashBoard()
      .then((data) => {
        if (data.data.data.dashboard.length > 0) {
          navigate('/dashboard/all');
        }
      })
      .catch((err) => {
        toast.error('Lấy dữ liệu Dashboard thất bại');
      });
  };
  useEffect(() => {
    handleGetDashBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pb-5">
      <SideBarIntroduces
        title="Dashboards"
        content="Bảng điều khiển là một công cụ trực quan hóa dữ liệu giúp chuyển đổi, hiển thị và sắp xếp tập hợp dữ liệu được thu thập và truyền bởi các thiết bị IoT."
        contentBtn="Tạo Dashboard"
        handleAddSucess={handleGetDashBoard}
        elementForm={FormCreateDashBoard}
      />
    </div>
  );
};

export default Dashboards;
