import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarIntroduces from '~/components/SideBarIntroduces';
import FormCreateCustomer from '~/pages/DetailCustomer/components/FormCreateCustomer';

let haveCustomer = 1;

const Customers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    haveCustomer && navigate('/customers-list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <SideBarIntroduces
        title="Khách hàng"
        content="Mang lại quyền truy cập cho khách hàng vào ứng dụng IoT của bạn. Tạo thành viên, nhà phát triển khác hoặc quản trị viên miền một cách dễ dàng."
        contentBtn="Tạo khách hàng"
        elementForm={FormCreateCustomer}
      />
    </div>
  );
};

export default Customers;
