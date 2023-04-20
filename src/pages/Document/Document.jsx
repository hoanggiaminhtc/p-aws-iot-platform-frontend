const Document = () => {
  return (
    <div className="min-h-screen bg-white px-4 pb-6 text-lg leading-8 text-black dark:bg-[#242526] dark:text-white">
      <h1 className="my-3 text-2xl font-bold">TÀI LIỆU</h1>
      <div className="py-2">
        <h2 className="mb-2 text-xl font-semibold">
          Ứng dụng web cho nền tảng IoT là gì?
        </h2>
        <p>
          Ứng dụng web cho nền tảng IoT: ứng dụng web cho nền tảng IoT sẽ thiết
          lập một giao diện giúp người dùng kết nối với các nút IoT phần cứng
          thông qua Gateway và các nút IoT có kết nối mạng để xem dữ liệu một
          cách trực quan và điều khiển chúng.
        </p>
      </div>
      <div className="py-2">
        <h2 className="mb-2 text-xl font-semibold">Các tác nhân chính</h2>
        <ul className="list-disc">
          Ứng dụng web cho nền tảng IoT có hai tác nhân chính đó là:
          <li className="ml-4">
            <span className="font-bold">Người dùng:</span> Đây là khách hàng có
            mong muốn giám sát các nút IoT được sử dụng trong khu vực của họ,
            phòng trường hợp có bất cứ mối nguy hại xảy ra.
          </li>
          <li className="ml-4">
            <span className="font-bold">Quản trị viên:</span> Đây là những người
            làm thuê, họ sẽ cung cấp các dịch vụ mà họ có thể làm như: tạo tài
            khoản người dùng, cấu hình các nút IoT cho người dùng, quản lý thông
            tin người dùng, v.v.
          </li>
        </ul>
      </div>
      <div className="py-2">
        <ul className="list-decimal">
          <p className="mb-2 text-xl font-semibold">
            Quy trình hoạt động của ứng dụng web cho nền tảng IoT:
          </p>
          <li className="ml-4">
            <span className="font-bold">Thu thập dữ liệu : </span>Ứng dụng web
            sẽ thu thập dữ liệu từ các thiết bị IoT thông qua giao thức truyền
            thông như MQTT, HTTP,.v.v.
          </li>
          <li className="ml-4">
            <span className="font-bold">Lưu trữ dữ liệu : </span>Dữ liệu sau khi
            được thu thập sẽ được lưu trữ trong cơ sở dữ liệu để có thể truy
            xuất và sử dụng lại sau này.
          </li>
          <li className="ml-4">
            <span className="font-bold">Hiển thị dữ liệu : </span>Dữ liệu sau
            khi được lưu trữ sẽ được hiển thị trên giao diện ứng dụng web. Người
            dùng có thể truy cập vào ứng dụng web để xem các thông tin về các
            thiết bị IoT như gateway và nút IoT (IoT-Nodes).
          </li>
          <li className="ml-4">
            <span className="font-bold">Điều khiển thiết bị : </span>Ứng dụng
            web cho phép điều khiển các thiết bị IoT thông qua giao diện. Người
            dùng có thể thực hiện thao tác bật/tắt thiết bị.
          </li>
        </ul>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Các chức năng chính</h2>
        <ul className="list-decimal">
          <li className="ml-4">
            <span className="font-bold">Đăng nhập : </span>
            Hệ thống cho phép người dùng đăng nhập thông qua email và mật khẩu.
            để sử dụng các chức năng của hệ thống.
            <ul className="list-disc">
              <li className="ml-8">
                Đối với người dùng cần đăng nhập để có thể thực hiện các chức
                năng như quản lý Gateway, quản lý thiết bị, quản lý bảng điểu
                khiển, quản lý tiện ích và đăng xuất.
              </li>
              <li className="ml-8">
                Đối với quản trị viên cần đăng nhập để sử dụng các chức năng
                giống với người dùng và thực hiện thêm một chức năng nữa là quản
                lý người dùng.
              </li>
            </ul>
          </li>
          <li className="ml-4">
            <span className="font-bold">Quản lý Gateway : </span>
            Hệ thống cho phép người dùng/quản trị viên thực hiện tạo Gateway,
            cập nhật thông tin Gateway và xóa Gateway.
          </li>
          <li className="ml-4">
            <span className="font-bold">Quản lý nút IoT(IoT-Nodes) : </span>
            Hệ thống cho phép người dùng thực hiện/quản trị viên thực hiện tạo
            nút IoT, cập nhật nút IoT, xóa nút IoT.
          </li>
          <li className="ml-4">
            <span className="font-bold">Quản lý bảng điều khiển : </span>
            Hệ thống cho phép người dùng/quản trị viên thực hiện tạo bảng điều
            khiển và xóa bảng điều khiển.
          </li>
          <li className="ml-4">
            <span className="font-bold">Quản lý các tiện ích : </span>
            Hệ thống cho phép người dùng/quản trị viên thực hiện tạo tiện ích,
            xóa tiện ích. Trong đó tiện ích bao gồm biểu đồ đường(line chart) để
            người dùng quan sát dữ liệu do IoT-Node gửi lên và nút bấm để người
            dùng thực hiện bật tắt IoT-Node.
          </li>
          <li className="ml-4">
            <span className="font-bold">Quản lý hồ sơ cá nhân : </span>
            Hệ thống cho phép người dùng và quản trị viên thực hiện thao tác cập
            nhật thông tin cá nhân hoặc đổi mật khẩu.
          </li>
          <li className="ml-4">
            <span className="font-bold">Đăng xuất : </span>
            Hệ thống cho phép người dùng có tài khoản trong hệ thống thực hiện
            đăng xuất khỏi hệ thống.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Document;
