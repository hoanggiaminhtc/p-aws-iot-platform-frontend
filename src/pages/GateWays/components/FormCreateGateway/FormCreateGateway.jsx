import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import SpinnerEllipsis from '~/components/UI/SpinnerEllipsis';
import { addDevice } from '~/api/deviceApi';

const FormCreateGateway = ({ handleClickCLoseModal, handleAddSucess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      gateWayName: '',
      gateWayDes: '',
      getWayLimitDevice: 1,
    },
    validationSchema: Yup.object({
      gateWayName: Yup.string().required("You must fill gateway's name"),
      gateWayDes: Yup.string().required("You must fill gateway's description"),
      getWayLimitDevice: Yup.number().required(
        'You must fill the number device connection',
      ),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      addDevice({
        name: values.gateWayName,
        des: values.gateWayDes,
        number: values.getWayLimitDevice,
      })
        .then(() => {
          toast.success('Tạo gateway thành công!', {
            theme: 'colored',
          });
          handleAddSucess();
        })
        .catch((err) => {
          toast.error('Tạo gateway thất bại!', {
            theme: 'colored',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
      //Đây là xử lý tạo gateway
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
        className="rounded-md bg-white pb-5 xs:w-[95%] sm:w-5/6 md:w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
          <div className="pl-6">Add new device</div>
          <div className="cursor-pointer pr-6" onClick={clickCloseModal}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="px-6">
          <InputForm
            nameId="gateWayName"
            name="Gateway's name"
            value={formik.values.gateWayName}
            handleOnChange={formik.handleChange}
            error={formik.errors.gateWayName}
            touch={formik.touched.gateWayName}
          />

          <InputForm
            nameId="gateWayDes"
            name="Gateway's description"
            value={formik.values.gateWayDes}
            handleOnChange={formik.handleChange}
            error={formik.errors.gateWayDes}
            touch={formik.touched.gateWayDes}
          />
          <InputForm
            nameId="getWayLimitDevice"
            name="Number of devices to connect"
            type="number"
            value={formik.values.getWayLimitDevice}
            handleOnChange={formik.handleChange}
            error={formik.errors.getWayLimitDevice}
            touch={formik.touched.getWayLimitDevice}
          />
          {!isLoading ? (
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
              >
                Create a new gateway
              </button>
              <button
                type="button"
                className="ml-2 w-full rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                onClick={clickCloseModal}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="text-center">
              <SpinnerEllipsis />
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};

FormCreateGateway.propTypes = {
  handleClickCLoseModal: PropTypes.func,
};

export default FormCreateGateway;
