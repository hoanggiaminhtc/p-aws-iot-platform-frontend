import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BackgroundTitle from '~/assets/image/background_title.jpg';
import Modal from '~/components/Modal';
import Notification from '~/components/Notification';
import Spinner from '~/components/UI/Spinner';
import { forgetPassword } from '~/api/userApi';
import Auth from '~/components/UI/Auth';

const LostPassword = () => {
  const [notificationSucess, setNotificationSucess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('You must fill your email'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      forgetPassword(values.email)
        .then((data) => {
          setNotificationSucess(true);
        })
        .catch((err) => {
          setNotificationSucess(false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleNotiSuccess = () => {
    navigate('/log-in');
  };

  const handleNotiFailure = () => {
    setNotificationSucess(null);
  };

  return (
    <Auth>
      <div className="flex h-screen w-screen items-center justify-center bg-[#F0F3F4]">
        <form
          className="w-full max-w-md rounded bg-white px-6 py-10"
          onSubmit={formik.handleSubmit}
        >
          <img
            src={BackgroundTitle}
            alt="background-title"
            className="mx-auto h-full max-h-[134px] w-full max-w-[134px] rounded-full border border-solid border-blue-600"
          />
          <h2 className="my-5 text-center text-xl font-bold">
            Lost your password?
          </h2>
          <p className="text-center text-base">
            It happens to the best of us! Enter your email address to recive
            instructions on how to reset your password
          </p>
          <div className="mt-2 mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-base font-bold text-gray-900 "
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900 caret-blue-600 outline-none focus:border-blue-500"
              placeholder="name@thanglong.edu.vn"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="off"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-left text-red-600">{formik.errors.email}</p>
            )}
          </div>
          {!loading ? (
            <button className="w-full rounded-md bg-[#126cf0] py-2 text-white hover:bg-[#126bf0ec]">
              Send Email
            </button>
          ) : (
            <div className="flex justify-center">
              <Spinner></Spinner>
            </div>
          )}
          <div className="mt-6 text-center text-base">
            Need an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </div>
          <div className="mt-2 text-center text-base">
            Suddenly remembered?{' '}
            <a href="/log-in" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </form>
        {notificationSucess === true && (
          <Modal>
            <Notification
              success={true}
              btnName="Quay về trang đăng nhập"
              textTitle="Gửi thư thành công"
              textContent="Mật khẩu của bạn đã được gửi tới email của bạn thành công. Vui lòng kiểm
          tra mật khẩu tại email của bạn và đăng nhập lại"
              handleClick={handleNotiSuccess}
            ></Notification>
          </Modal>
        )}
        {notificationSucess === false && (
          <Modal>
            <Notification
              success={false}
              btnName="Quay lại trang"
              textTitle="Gửi thư thất bại"
              textContent="Thay đổi mất khẩu thất bại"
              handleClick={handleNotiFailure}
            ></Notification>
          </Modal>
        )}
      </div>
    </Auth>
  );
};

export default LostPassword;
