import React from 'react';
import BackGroundTitle from '~/assets/image/background_title.jpg';
import ModalNotification from '~/components/UI/ModalNotification';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogout } from '~/redux/slice/userSlice';

const NotificationAuthen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleErrAuthen = () => {
    dispatch(handleLogout());
    navigate('/log-in');
  };
  return (
    <div className="h-screen w-screen">
      <img
        src={BackGroundTitle}
        alt="background-title"
        className="h-full w-full object-contain"
      />
      <ModalNotification
        title="Phiên đã hết hạn"
        des="Vui lòng đăng nhập lại để làm mới phiên của bạn"
        onHandleClick={handleErrAuthen}
      />
    </div>
  );
};

export default NotificationAuthen;
