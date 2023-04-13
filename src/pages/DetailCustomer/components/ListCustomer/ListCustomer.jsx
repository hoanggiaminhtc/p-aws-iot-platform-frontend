import React from 'react';
import PropTypes from 'prop-types';
import { FaListAlt } from 'react-icons/fa';
import Customer from '';

const ListCustomer = ({ handleOpenModalDeleteCustomer }) => {
  const listCustomers = [
    {
      createdTime: '2022-09-23 21:45:06',
      name: 'Hoang Gia Minh',
      address: 'Hà Nội',
      phoneNumber: '123456789',
    },
  ];

  return (
    <div>
      <div className="mx-4 flex h-11 items-center bg-[#F6F8F8] pl-2 text-base dark:bg-[#202124] dark:text-white">
        Customer List
        <FaListAlt className="ml-2 text-[#98A6AD]" />
      </div>
      {/* <div className="flex justify-end my-1">
        <div className="w-1/3 mr-4">
          <FormSearch></FormSearch>
        </div>
      </div> */}
      <div className="relative mx-4">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Created time
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listCustomers.map((customer, index) => {
              return (
                <Customer
                  key={index}
                  idCustomer={index.toString()}
                  createdTime={customer.createdTime}
                  name={customer.name}
                  addressCustomer={customer.address}
                  onClickHandleOpenDelete={handleOpenModalDeleteCustomer}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ListCustomer.propTypes = {
  handleOpenModalDeleteCustomer: PropTypes.func,
};

export default ListCustomer;
