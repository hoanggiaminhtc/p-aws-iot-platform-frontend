import React from 'react';
import { FaRocket, FaInfoCircle } from 'react-icons/fa';

import DetailInfor from '~/components/DetailInfor';
const DetailCustomer = () => {
  const inforCustomerConfiguration = [
    { title: 'Customer Type', infor: 'Company' },
    { title: 'Customer Email', infor: '134567876543' },
    { title: 'Customer Password', infor: '134567876543' },
    { title: 'Customer Id', infor: '121241241' },
  ];

  const inforCustomer = [
    { title: 'Customer Name', infor: 'Hoang Gia Minh' },
    {
      title: 'Customer Address',
      infor: 'Hoàng Mai, Hà Nôi, Gia Lâm',
    },
    {
      title: 'Customer Discription',
      infor: 'Công ty phát triển phần mềm một thành viên',
    },
    {
      title: 'Customer Phone Number',
      infor: '0612843654',
    },
  ];
  return (
    <div className="bg-[#F0F3F4] px-6 pt-6">
      <div>
        <div className="flex h-10 items-center bg-[#F6F8F8] px-3 text-base">
          Customer Details
        </div>
        <div className="min-h-full bg-white px-3">
          <div className="gridCustom">
            <div></div>
            <div className="flex items-center py-5 text-base font-bold leading-5 text-black">
              <FaRocket className="mr-1" />
              Customer Configuration
            </div>
          </div>
          {inforCustomerConfiguration.map((infor, index) => {
            return (
              <DetailInfor
                key={index}
                title={infor.title}
                infor={infor.infor}
              />
            );
          })}
          <div className="gridCustom">
            <div></div>
            <div className="flex items-center py-5 text-base font-bold leading-5 text-black">
              <FaInfoCircle className="mr-1" />
              Customer Information
            </div>
          </div>
          {inforCustomer.map((infor, index) => {
            return (
              <DetailInfor
                key={index}
                title={infor.title}
                infor={infor.infor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailCustomer;
