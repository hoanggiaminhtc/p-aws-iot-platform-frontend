/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import { register } from '~/api/adminApi';
import { toast } from 'react-toastify';

const FormCreateCustomer = ({ handleClickCLoseModal }) => {
  const formik = useFormik({
    initialValues: {
      customerFirstName: '',
      customerLastName: '',
      customerEmail: '',
      customerPassword: '',
    },
    validationSchema: Yup.object({
      customerFirstName: Yup.string().required(
        "You must fill customer's first name",
      ),
      customerLastName: Yup.string().required(
        "You must fill customer's last name",
      ),
      customerEmail: Yup.string()
        .email('Invalid email')
        .required("You must fill customer's email"),
      customerPassword: Yup.string()
        .min(10, 'Your password must be at least 10 characters')
        .required("You must fill customer's password"),
    }),
    onSubmit: (values) => {
      //Đây là xử lý tạo khách hàng
      let body = {
        name: values.customerLastName + ' ' + values.customerFirstName,
        email: values.customerEmail,
        password: values.customerPassword,
      };
      register(body)
        .then((user) => {
          formik.handleReset();
          handleClickCLoseModal();
          toast.success('Tạo người dùng thành công');
        })
        .catch(() => {
          toast.error('Tạo người dùng thất bại!');
        });
    },
  });

  const clickCloseModal = () => {
    formik.handleReset();
    handleClickCLoseModal();
  };

  return (
    <Modal haveAnimation>
      <form
        className="w-11/12 overflow-hidden rounded-md bg-white pb-5 dark:bg-[#202124] lg:w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
          <div className="pl-6">Customer</div>
          <div className="cursor-pointer pr-6" onClick={clickCloseModal}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="grid px-6 md:grid-cols-2 md:gap-6">
          <InputForm
            nameId="customerFirstName"
            name="First name"
            value={formik.values.customerFirstName}
            handleOnChange={formik.handleChange}
            error={formik.errors.customerFirstName}
            touch={formik.touched.customerFirstName}
          />
          <InputForm
            nameId="customerLastName"
            name="Last name"
            value={formik.values.customerLastName}
            handleOnChange={formik.handleChange}
            error={formik.errors.customerLastName}
            touch={formik.touched.customerLastName}
          />
        </div>
        <div className="px-6">
          <InputForm
            type="email"
            nameId="customerEmail"
            name="Customer's email"
            value={formik.values.customerEmail}
            handleOnChange={formik.handleChange}
            error={formik.errors.customerEmail}
            touch={formik.touched.customerEmail}
          />
          <InputForm
            type="password"
            nameId="customerPassword"
            name="Customer's password"
            value={formik.values.customerPassword}
            handleOnChange={formik.handleChange}
            error={formik.errors.customerPassword}
            touch={formik.touched.customerPassword}
          />
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              Create a new customer
            </button>
            <button
              type="button"
              className="ml-2 w-full rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
              onClick={clickCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

FormCreateCustomer.propTypes = {
  handleClickCLoseModal: PropTypes.func,
};

export default FormCreateCustomer;