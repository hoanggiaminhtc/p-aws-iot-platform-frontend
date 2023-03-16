import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';

const FormCreateCustomer = ({ handleClickCLoseModal }) => {
  const formik = useFormik({
    initialValues: {
      customerFirstName: '',
      customerLastName: '',
      customerDes: '',
      customerAddress: '',
      customerPhoneNumber: '',
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
      customerDes: Yup.string().required(
        "You must fill customer's description",
      ),
      customerAddress: Yup.string().required(
        "You must fill customer's address",
      ),
      customerPhoneNumber: Yup.string().required(
        "You must fill customer's phone number",
      ),
      customerEmail: Yup.string()
        .email('Invalid email')
        .required("You must fill customer's email"),
      customerPassword: Yup.string()
        .min(10, 'Your password must be at least 10 characters')
        .required("You must fill customer's password"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      //Đây là xử lý tạo khách hàng
      formik.handleReset();
    },
  });

  const clickCloseModal = () => {
    formik.handleReset();
    handleClickCLoseModal();
  };

  return (
    <Modal>
      <form
        className="w-1/2 rounded-md bg-white pb-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
          <div className="pl-6">Add new customer</div>
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
            nameId="customerDes"
            name="Customer's description"
            value={formik.values.customerDes}
            handleOnChange={formik.handleChange}
            error={formik.errors.customerDes}
            touch={formik.touched.customerDes}
          />
          <InputForm
            nameId="customerAddress"
            name="Customer's address"
            value={formik.values.customerAddress}
            handleOnChange={formik.handleChange}
            error={formik.errors.customerAddress}
            touch={formik.touched.customerAddress}
          />
          <InputForm
            type="tel"
            nameId="customerPhoneNumber"
            name="Customer's phone number"
            value={formik.values.customerPhoneNumber}
            handleOnChange={formik.handleChange}
            error={formik.errors.customerPhoneNumber}
            touch={formik.touched.customerPhoneNumber}
          />
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
