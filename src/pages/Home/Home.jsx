import React, { useEffect, useState } from 'react';
import { MdDevicesOther } from 'react-icons/md';
// import { FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getDevices } from '~/api/deviceApi';

import BackGroundIcon from '~/assets/image/image_icon_home_page.png';
import Introducer from './components/Introducer';

const INTRODUCER_CONTEXT = [
  {
    title: 'Kiểm soát môi trường',
    des: "Trường hợp sử dụng giám sát môi trường cơ bản trực quan hóa các cảm biến trên bản đồ và sử dụng bảng. Cho phép bạn cung cấp các cảm biến mới và chỉ định chúng cho khách hàng. Cho phép người dùng tùy chỉnh định cấu hình ngưỡng cảnh báo cho từng cảm biến và quản lý cảnh báo. Sử dụng điều này làm mẫu cho các dự án giám sát môi trường ngoài trời. \n \n Trường hợp sử dụng giới thiệu một số khái niệm ThingsBoard: thiết bị, cấu hình thiết bị, bảng điều khiển nhiều lớp và hành động của tiện ích con. Bảng điều khiển 'Giám sát môi trường' chứa các ví dụ hữu ích về hành động tùy chỉnh để quản lý thiết bị và thuộc tính của chúng thông qua giao diện người dùng Bảng điều khiển.",
    imgLink: 'https://thingsboard.io/images/demo/data/temperature-sensors.png',
    flexReverse: false,
  },
  {
    title: 'Kiểm soát môi trường',
    des: "Trường hợp sử dụng giám sát môi trường cơ bản trực quan hóa các cảm biến trên bản đồ và sử dụng bảng. Cho phép bạn cung cấp các cảm biến mới và chỉ định chúng cho khách hàng. Cho phép người dùng tùy chỉnh định cấu hình ngưỡng cảnh báo cho từng cảm biến và quản lý cảnh báo. Sử dụng điều này làm mẫu cho các dự án giám sát môi trường ngoài trời. \n \n Trường hợp sử dụng giới thiệu một số khái niệm ThingsBoard: thiết bị, cấu hình thiết bị, bảng điều khiển nhiều lớp và hành động của tiện ích con. Bảng điều khiển 'Giám sát môi trường' chứa các ví dụ hữu ích về hành động tùy chỉnh để quản lý thiết bị và thuộc tính của chúng thông qua giao diện người dùng Bảng điều khiển.",
    imgLink: 'https://thingsboard.io/images/demo/data/temperature-sensors.png',
    flexReverse: true,
  },
];

const Home = () => {
  const [deviceTotal, setDeviceTotal] = useState(0);
  const { user } = useSelector((selector) => selector.user);
  let arrName = user?.userName.split(' ') || [];

  useEffect(() => {
    getDevices().then((data) => {
      setDeviceTotal(data.data.data.device.length);
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 bg-[#faf9f9] p-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="introducer-statistical h-20 rounded-md border-[3px] border-solid border-[#000A3D] bg-[#000A3D] text-white hover:border-[#000A3D]">
          <div className="text-center text-sm font-bold leading-7">
            Total Devices
          </div>
          <div className="flex items-center justify-center text-2xl font-bold leading-8">
            <span className="flex h-8 w-10 items-center justify-center">
              <MdDevicesOther />
            </span>
            <span>{deviceTotal}</span>
          </div>
        </div>
      </div>
      <div className="bg-[#EEEEEE]">
        <div className="introducer-welcome bg-white pb-8">
          <div className="my-8  ml-0 flex items-center md:ml-5">
            <img src={BackGroundIcon} alt="" className="h-20 w-20"></img>
            <h2 className="text-2xl font-bold text-[#000A3D] sm:text-3xl md:text-4xl">
              Bắt đầu với TLU.io
            </h2>
          </div>
          <p className="px-3 text-justify tracking-wider md:px-8">
            {`Chào ${arrName[arrName.length - 1]}!`}
            <br />
            <br />
            Cảm ơn bạn đã quan tâm đến Nền tảng IoT mã nguồn mở TLU.io và bản
            demo trực tiếp của chúng tôi. Hiện tại bạn đang duyệt một bảng điều
            khiển đặc biệt có tên "Trang chủ". Chúng tôi đã chuẩn bị trang tổng
            quan này để minh họa một số trường hợp sử dụng được liệt kê bên
            dưới. Trên đầu trang tổng quan, bạn có thể tìm thấy một số thẻ. Nhấp
            vào một trong các thẻ để xem danh sách các thiết bị tương ứng. Nhấp
            vào biểu tượng chuông để xem danh sách các báo động thuộc về các
            thiết bị đó. Bạn luôn có thể thay đổi nội dung của trang tổng quan
            này bằng hướng dẫn này. Bạn cũng có thể thay đổi trang tổng quan
            chính cho người dùng của mình trong hồ sơ.
            <br />
            <br />
            Nhưng trước tiên, chúng tôi khuyên bạn nên làm theo hướng dẫn bắt
            đầu. Ở đó, bạn sẽ tìm hiểu những điều cơ bản về cách kết nối thiết
            bị, định cấu hình quy tắc cảnh báo, cung cấp bảng điều khiển và chỉ
            định chúng cho khách hàng của bạn. Sử dụng kiến ​​thức từ hướng dẫn
            bắt đầu, việc áp dụng các trường hợp sử dụng đó theo nhu cầu của bạn
            sẽ dễ dàng hơn nhiều.
          </p>
          {INTRODUCER_CONTEXT?.map((introducer, index) => {
            return (
              <Introducer
                key={index}
                title={introducer.title}
                des={introducer.des}
                imgLink={introducer.imgLink}
                flexReverse={introducer.flexReverse}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
