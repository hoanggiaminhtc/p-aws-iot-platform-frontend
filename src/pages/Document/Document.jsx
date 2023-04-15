const Document = () => {
  return (
    <div className="min-h-screen bg-white px-4 text-base text-black dark:bg-black dark:text-white">
      <h1 className="mb-4 text-2xl font-bold">Giới thiệu</h1>
      <h2 className="my-2 mb-3 text-xl font-semibold">
        Ứng dụng web cho nền tảng IoT là gì?
      </h2>
      <p>
        Ứng dụng web cho nền tảng IoT: ứng dụng web cho nền tảng IoT sẽ thiết
        lập một giao diện giúp người dùng kết nối với các nút IoT phần cứng
        thông qua Gateway và các nút IoT có kết nối mạng để xem dữ liệu một cách
        trực quan và điều khiển chúng.
      </p>
      <h2 className="mb-3 text-xl font-semibold">Các tác nhân chính</h2>
      <ul>
        Ứng dụng web cho nền tảng IoT có hai tác nhân chính đó là:
        <li>
          Người dùng: Đây là khách hàng có mong muốn giám sát các nút IoT được
          sử dụng trong khu vực của họ, phòng trường hợp có bất cứ mối nguy hại
          xảy ra.
        </li>
        <li>
          Quản trị viên: Đây là những người làm thuê, họ sẽ cung cấp các dịch vụ
          mà họ có thể làm như: tạo tài khoản người dùng, cấu hình các nút IoT
          cho người dùng, quản lý thông tin người dùng, v.v.
        </li>
      </ul>
      <ul>
        <p className="mb-3 text-xl font-semibold">
          Quy trình hoạt động của ứng dụng web cho nền tảng IoT:
        </p>
        <li>
          Thu thập dữ liệu: Ứng dụng web sẽ thu thập dữ liệu từ các thiết bị IoT
          thông qua giao thức truyền thông như MQTT, HTTP,.v.v.
        </li>
        <li>
          Lưu trữ dữ liệu: Dữ liệu sau khi được thu thập sẽ được lưu trữ trong
          cơ sở dữ liệu để có thể truy xuất và sử dụng lại sau này.
        </li>
        <li>
          Hiển thị dữ liệu: Dữ liệu sau khi được lưu trữ sẽ được hiển thị trên
          giao diện ứng dụng web. Người dùng có thể truy cập vào ứng dụng web để
          xem các thông tin về các thiết bị IoT như gateway và nút IoT
          (IoT-Nodes).
        </li>
        <li>
          Điều khiển thiết bị: Ứng dụng web cho phép điều khiển các thiết bị IoT
          thông qua giao diện. Người dùng có thể thực hiện thao tác bật/tắt
          thiết bị
        </li>
      </ul>
    </div>
  );
};

export default Document;
