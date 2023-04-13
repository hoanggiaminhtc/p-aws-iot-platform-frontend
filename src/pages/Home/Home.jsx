import { useEffect, useMemo, useState } from 'react';
import { MdDevicesOther } from 'react-icons/md';
// import { FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getGateWayList } from '~/api/gateWayApi';

import BackGroundIcon from '~/assets/image/image_icon_home_page.png';
import Introducer from './components/Introducer';
import DeviceManager from "~/assets/image/Device-manager.PNG"
import WidgetManager from "~/assets/image/Widget-manager.PNG"

const INTRODUCER_CONTEXT = [
  {
    title: 'Quản lý các thiết bị',
    des: "Quản lý thiết bị cho phép bạn quản lý hoặc cập nhật thiết bị từ xa và duy trì trạng thái của cụm thiết bị của bạn. Bạn cũng có thể thực hiện từ xa các hoạt động trên toàn hạm đội như khởi động lại, các bản vá bảo mật, và khởi động lại nhà máy.\n\n Quản lý thiết bị sẽ giúp phát hiện lỗi thiết bị, giúp dự đoán bảo trì. Điều này ngăn các sự cố nhỏ trở nên lớn hơn và cần ít thời gian bảo trì hơn, do đó dẫn đến chi phí hoạt động thấp hơn.",
    imgLink: DeviceManager,
    flexReverse: false,
    linkTo:"/gateways",
    linkToRead:"/document"
  },
  {
    title: 'Quản lý các biểu đồ',
    des: "Quản lý biểu đồ cho phép bạn quản lý hoặc cập nhật biểu đồ từ xa và duy trì trạng thái của nó. Bạn cũng có thể thực hiện xem biểu đồ hoặc đánh giá dữ liệu từ thiết bị thông qua việc hiển thị biểu đồ",
    imgLink: WidgetManager,
    flexReverse: true,
    linkTo:"/dashboards",
    linkToRead:"/document"
  }
];

const Home = () => {
  const [gatewayTotal, setGateTotal] = useState(0);
  const { user } = useSelector((selector) => selector.user);

  let arrName = useMemo(() => {
    if (user) return user?.userName.split(' ');
    else return [];
  }, [user]);

  useEffect(() => {
    getGateWayList().then((data) => {
      setGateTotal(data.data.data.gateway.length);
    });
  }, []);

  return (
    <div className="dark:bg-[#202124] dark:text-white">
      <div className="grid grid-cols-1 gap-4 bg-[#faf9f9] p-4 dark:bg-[#202124] sm:grid-cols-2 md:grid-cols-4">
        <div className="introducer-statistical h-20 rounded-md border-[3px] border-solid border-[#000A3D] bg-[#000A3D] text-white hover:border-[#000A3D] dark:bg-[#2E89FF]">
          <div className="text-sm font-bold leading-7 text-center">
            Gateways
          </div>
          <div className="flex items-center justify-center text-2xl font-bold leading-8">
            <span className="flex items-center justify-center w-10 h-8">
              <MdDevicesOther />
            </span>
            <span>{gatewayTotal}</span>
          </div>
        </div>
      </div>
      <div className="bg-[#EEEEEE] dark:bg-[#242526]">
        <div className="introducer-welcome bg-white pb-8 dark:bg-[#242526]">
          <div className="flex items-center my-8 ml-0 md:ml-5">
            <img src={BackGroundIcon} alt="" className="w-20 h-20"></img>
            <h2 className="text-2xl font-bold text-[#000A3D] dark:text-[#2E89FF] sm:text-3xl md:text-4xl ">
              Bắt đầu với TLU.io
            </h2>
          </div>
          <p className="px-3 tracking-wider text-justify md:px-8">
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
            định chúng cho khách hàng của bạn. Sử dụng kiến thức từ hướng dẫn
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
                linkTo={introducer.linkTo}
                linkToRead={introducer.linkToRead}

              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;