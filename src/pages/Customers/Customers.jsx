import React, { useState, useRef } from 'react';

import SideBarIntroduces from '~/components/SideBarIntroduces';
import FormCreateCustomer from '~/components/FormCreateCustomer';
import ListCustomer from '~/components/ListCustomer';
import Dialog from '~/components/Dialog';

const Customers = () => {
  const [openModalDeleteCustomer, setOpenModalDeleteCustomer] = useState(false);

  const idCustomer = useRef(null);

  const handleOpenModalDeleteCustomer = (idCustomerDelete) => {
    idCustomer.current = idCustomerDelete;
    setOpenModalDeleteCustomer(true);
  };

  const handleCloseModalDeleteCustomer = () => {
    setOpenModalDeleteCustomer(false);
  };

  const handleDeleteCustomer = () => {
    console.log(`Xóa khách hàng ${idCustomer.current} thành công`);
    idCustomer.current = null;
    setOpenModalDeleteCustomer(false);
  };

  return (
    <div>
      <SideBarIntroduces
        title="Customers"
        content="Bring access to your customers to your IoT application. Create members, other developers, or domain administrators easily."
        contentBtn="Create a Customer"
        elementForm={FormCreateCustomer}
      />
      {openModalDeleteCustomer && (
        <Dialog
          nameBtn="Xóa khách hàng"
          desBtn="Bạn sẽ mất tất cả dữ liệu bằng cách xóa khách hàng của mình. Hành động này không thể quay trở lại được."
          handleClickCancel={handleCloseModalDeleteCustomer}
          handeClickDelete={handleDeleteCustomer}
        />
      )}
      <ListCustomer
        handleOpenModalDeleteCustomer={handleOpenModalDeleteCustomer}
      />
    </div>
  );
};

export default Customers;
