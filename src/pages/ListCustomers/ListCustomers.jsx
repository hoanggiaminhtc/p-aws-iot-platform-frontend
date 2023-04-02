import { useEffect, useRef, useState } from 'react';
import { FaListAlt } from 'react-icons/fa';

import Dialog from '~/components/Dialog';
import Customer from './components/Customer';
import FormCreateCustomer from '~/pages/DetailCustomer/components/FormCreateCustomer';
import { deleteCustomer, getCustomers } from '~/api/adminApi';
import { toast } from 'react-toastify';

const ListCustomers = () => {
  const [listCustomers, setListCustomers] = useState([]);
  const [openModalDeleteCustomer, setOpenModalDeleteCustomer] = useState(false);
  const [openModalCreateNewCustomer, setOpenModalCreateNewCustomer] =
    useState(false);

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
    deleteCustomer(idCustomer.current)
      .then((data) => {
        getListCustomers();
        idCustomer.current = null;
        setOpenModalDeleteCustomer(false);
      })
      .catch((err) => {
        toast.error('Xóa người dùng thất bại');
      });
  };

  const getListCustomers = () => {
    getCustomers()
      .then((customers) => {
        setListCustomers(customers.data.data);
      })
      .catch((err) => {
        toast.error('Lấy dữ liệu người dùng thất bại');
      });
  };
  useEffect(() => {
    getListCustomers();
  }, []);

  return (
    <div>
      <div className="flex h-11 items-center bg-[#F6F8F8] pl-2 text-base dark:bg-[#202124] dark:text-white">
        Customer List
        <FaListAlt className="ml-2 text-[#98A6AD]" />
      </div>
      <div className="relative mx-4">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="hidden px-6 py-3 md:inline-block">
                Created time
              </th>
              <th scope="col" className="px-1 py-3 md:px-6">
                Name
              </th>
              <th scope="col" className="px-1 py-3 md:px-6">
                Email
              </th>
              <th
                scope="col"
                className="hidden px-1 py-3 md:inline-block md:px-6"
              ></th>
            </tr>
          </thead>
          <tbody>
            {listCustomers?.map((customer, index) => {
              return (
                <Customer
                  key={customer._id}
                  idCustomer={customer._id}
                  createdTime={new Date(customer.createdAt).toLocaleDateString(
                    'en-GB',
                  )}
                  name={customer.name}
                  addressCustomer={customer.email}
                  onClickHandleOpenDelete={handleOpenModalDeleteCustomer}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          setOpenModalCreateNewCustomer(true);
        }}
        className={`fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#D91E1E] p-1 text-4xl
          text-white`}
      >
        +
      </button>
      {openModalCreateNewCustomer && (
        <FormCreateCustomer
          handleClickCLoseModal={() => {
            getListCustomers();
            setOpenModalCreateNewCustomer(false);
          }}
        />
      )}
      {openModalDeleteCustomer && (
        <Dialog
          nameBtn="Xóa khách hàng"
          desBtn="Bạn sẽ mất tất cả dữ liệu bằng cách xóa khách hàng của mình. Hành động này không thể quay trở lại được."
          handleClickCancel={handleCloseModalDeleteCustomer}
          handeClickDelete={handleDeleteCustomer}
        />
      )}
    </div>
  );
};

export default ListCustomers;
