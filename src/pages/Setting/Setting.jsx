import React from 'react';
import { ImCheckmark } from 'react-icons/im';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { changePassword } from '~/api/userApi';

const Setting = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('You must fill your current password'),
      newPassword: Yup.string()
        .required('You must fill your new password')
        .min(10, 'Your new password must be at least 10 characters'),
      repeatNewPassword: Yup.string()
        .oneOf(
          [Yup.ref('newPassword')],
          'Your repeat new password does not match!',
        )
        .required('You must fill your repeat new password '),
    }),
    onSubmit: (values) => {
      changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
        .then(() => {
          toast.success('Thay đổi mật khẩu thành công!', {
            theme: 'colored',
          });
        })
        .catch(() => {
          toast.error('Thay đổi mật khẩu thất bại!', {
            theme: 'colored',
          });
        });
      formik.handleReset();
    },
  });
  return (
    <div>
      <div className=" bg-[#f6f8f8] py-4 px-4 text-sm leading-[15px] text-black dark:bg-[#202124] dark:text-white">
        Account Password
      </div>
      <form
        className="bg-white px-4 pt-4 dark:bg-[#202124]"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="oldPassword"
            className="mb-2 block text-sm font-medium leading-5 text-[#58666e] dark:text-white"
          >
            Current Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="block w-full border border-[#000A3D] bg-[#E8F0FE] p-2.5 text-sm text-black outline-none dark:bg-black dark:text-white"
            placeholder="Enter your current password"
            autoComplete="off"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.oldPassword && formik.touched.oldPassword && (
            <p className="text-left text-red-600">
              {formik.errors.oldPassword}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium leading-5 text-[#58666e] dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            className="block w-full border border-gray-300 bg-white  p-2.5 text-sm text-gray-900 outline-none focus:border-[#000A3D] focus:ring-[#000A3D] dark:bg-black dark:text-white"
            autoComplete="off"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-left text-red-600">
              {formik.errors.newPassword}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeatPassword"
            className="mb-2 block text-sm font-medium leading-5 text-[#58666e] dark:text-white"
          >
            Repeat New Password
          </label>
          <input
            type="password"
            id="repeatNewPassword"
            name="repeatNewPassword"
            placeholder="Repeat your new password"
            className="block w-full border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none focus:border-[#000A3D] focus:ring-[#000A3D] dark:bg-black dark:text-white"
            autoComplete="off"
            value={formik.values.repeatNewPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.repeatNewPassword &&
            formik.touched.repeatNewPassword && (
              <p className="text-left text-red-600">
                {formik.errors.repeatNewPassword}
              </p>
            )}
        </div>
        <button
          className="flex h-[34px] items-center text-sm leading-5 text-white"
          type="submit"
        >
          <span className="flex h-full w-[34px] items-center justify-center bg-[#000A3D]">
            <ImCheckmark />
          </span>
          <span className="flex h-full items-center bg-[#000A3D] px-[14px]">
            Update
          </span>
        </button>
      </form>
    </div>
  );
};

export default Setting;
