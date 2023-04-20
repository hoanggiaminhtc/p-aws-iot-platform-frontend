import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFormik } from 'formik';
import { AiOutlineClose } from 'react-icons/ai';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addGateWay } from '~/api/gateWayApi';
import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import SpinnerEllipsis from '~/components/UI/SpinnerEllipsis';

const FormCreateGateway = ({ handleClickCLoseModal, handleAddSucess }) => {
  const { user } = useSelector((select) => select.user);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      gateWayName: '',
      gateWayDes: '',
      serialnumber: 0,
    },
    validationSchema: Yup.object({
      gateWayName: Yup.string().required("You must fill gateway's name"),
      gateWayDes: Yup.string().required("You must fill gateway's description"),
      serialnumber: Yup.string().required(
        'You must fill the serial number connection',
      ),
    }),
    onSubmit: (values) => {
      const body = {
        name: values.gateWayName,
        description: values.gateWayDes,
        numberdevice: values.getWayLimitDevice,
        serialnumber: values.serialnumber,
      };
      setIsLoading(true);
      addGateWay(body)
        .then((data) => {
          toast.success('Thêm gateway thành công');
          handleAddSucess(user);
        })
        .catch((err) => {
          toast.error('Thêm gateway thất bại');
        })
        .finally(() => {
          setIsLoading(false);
          clickCloseModal();
        });
    },
  });

  const clickCloseModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.resetForm();
    handleClickCLoseModal();
  };

  return (
    <Modal>
      <form
        className="overflow-hidden rounded-md bg-white pb-5 shadow dark:bg-[#202124] xs:w-[95%] sm:w-5/6 md:w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
          <div className="pl-6">Gateway</div>
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
            nameId="serialnumber"
            name="Serial number of Gateway"
            value={formik.values.serialnumber}
            handleOnChange={formik.handleChange}
            error={formik.errors.serialnumber}
            touch={formik.touched.serialnumber}
          />
        </div>
        {isLoading ? (
          <div className="text-center">
            <SpinnerEllipsis />
          </div>
        ) : (
          <div className="flex items-center justify-end pr-6">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              Create a new gateway
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};

FormCreateGateway.propTypes = {
  handleClickCLoseModal: PropTypes.func,
};

export default FormCreateGateway;
