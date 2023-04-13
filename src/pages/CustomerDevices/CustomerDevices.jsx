import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerGateways } from '~/api/adminApi';
import CustomerGateway from './CustomerGateway';

const CustomerDevices = () => {
  const params = useParams();
  const [customerGateways, setCustomerGateways] = useState();

  useEffect(() => {
    getCustomerGateways(params.id).then((data) => {
      setCustomerGateways(data.data.data);
    });
  }, [params.id]);

  return (
    <div className="dark:text-white">
      <div className="flex h-12 items-center bg-[#F8F8F8] pl-4 capitalize text-[##333333] dark:bg-[#202124] dark:text-white">
        Customer
      </div>
      <div className="px-10">
        <ul className="grid grid-cols-3 py-4 text-left text-sm font-semibold text-[#374151] dark:text-white">
          <li>Gateway Name</li>
          <li>Create At</li>
          <li>Connect Status</li>
        </ul>
        {customerGateways?.map((gateway) => {
          return <CustomerGateway key={gateway._id} gateway={gateway} />;
        })}
        {customerGateways?.length === 0 && (
          <p className="text-center">Gateway rỗng</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDevices;
