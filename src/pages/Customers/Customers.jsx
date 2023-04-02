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
        title="Customers"
        content="Bring access to your customers to your IoT application. Create members, other developers, or domain administrators easily."
        contentBtn="Create a Customer"
        elementForm={FormCreateCustomer}
      />
    </div>
  );
};

export default Customers;
