import React from 'react';

const Bottom = () => {
  return (
    <div className="h-auto w-full bg-[#000A3D] px-4 py-16 lg:px-0 xl:px-0">
      <div className="mx-auto w-full text-white">
        <h2 className="mb-8 text-3xl font-extrabold">IoT Platform</h2>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
          <div>
            <div className="grid grid-cols-2 gap-4 text-base">
              <a
                href="/"
                className="text-[#9A99B8] hover:text-white hover:underline"
              >
                Giới thiệu
              </a>
              <a
                href="/"
                className="text-[#9A99B8] hover:text-white hover:underline"
              >
                Quản lý thiết bị phòng Lab
              </a>
              <a
                href="/"
                className="text-[#9A99B8] hover:text-white hover:underline"
              >
                Website IoT
              </a>
              <a
                href="/"
                className="text-[#9A99B8] hover:text-white hover:underline"
              >
                AWS
              </a>
            </div>
          </div>
          <div className="mt-4 pl-0 md:pl-0 lg:mt-0 lg:pl-5 xl:pl-28">
            <ul className="mb-4  list-none items-center gap-4 text-base text-[#9A99B8] sm:grid sm:grid-cols-2 lg:flex">
              <li className="w-auto flex-shrink-0 md:w-40">Điện thoại</li>
              <li>0328069233</li>
            </ul>
            <ul className="mb-4  list-none grid-cols-2 items-center gap-4 text-base text-[#9A99B8] sm:grid lg:flex">
              <li className="w-auto flex-shrink-0 md:w-40">Fax</li>
              <li>0328069233</li>
            </ul>
            <ul className="mb-4  list-none grid-cols-2 items-center gap-4 text-base text-[#9A99B8] sm:grid lg:flex">
              <li className="w-auto flex-shrink-0 md:w-40">Email</li>
              <li>a32509@thanglong.edu.vn</li>
            </ul>
            <ul className="mb-4  list-none grid-cols-2 items-center gap-4 text-base text-[#9A99B8] sm:grid lg:flex">
              <li className="w-auto flex-shrink-0 md:w-40">Địa chỉ</li>
              <li>Nghiêm Xuân Yêm - Đại Kim - Hoàng Mai - Hà Nội</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
