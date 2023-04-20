import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import InputSelectForm from '~/components/UI/InputSelectForm';
import SpinnerEllipsis from '~/components/UI/SpinnerEllipsis';
import { addDevice } from '~/api/deviceApi';

const OPTION_LIST_TYPE = [
  { name: "Choose a device's type", value: 'Default' },
  { name: 'Sensor', value: 'Sensor' },
  { name: 'Light', value: 'Light' },
  { name: 'Other', value: 'Other' },
];

const FormCreateDevice = ({
  handleClickCLoseModal,
  handleAddSucess,
  gatewayId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      deviceName: '',
      deviceDes: '',
      deviceType: 'Default',
      serialnumberDevice: '',
    },
    validationSchema: Yup.object({
      deviceName: Yup.string().required("You must fill device's name"),
      deviceType: Yup.string().required("You must fill device's type"),
      deviceDes: Yup.string(),
      serialnumberDevice: Yup.string().required(
        "You must fill device's serial number",
      ),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      addDevice(
        {
          name: values.deviceName,
          type: values.deviceType,
          description: values.deviceDes,
          serialnumber: values.serialnumberDevice,
        },
        gatewayId,
      )
        .then(() => {
          toast.success('Tạo thiết bị thành công!', {
            theme: 'colored',
          });
          handleAddSucess();
          formik.handleReset();
        })
        .catch((err) => {
          toast.error('Tạo thiết bị thất bại!', {
            theme: 'colored',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const clickCloseModal = () => {
    formik.handleReset();
    handleClickCLoseModal();
  };

  return (
    <Modal>
      <form
        className="rounded-md bg-white pb-5 dark:bg-[#202124] xs:w-[95%] sm:w-5/6 md:w-1/2 "
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
          <div className="pl-6">Device</div>
          <div className="cursor-pointer pr-6" onClick={clickCloseModal}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="px-6">
          <InputForm
            nameId="deviceName"
            name="Device's name"
            value={formik.values.deviceName}
            handleOnChange={formik.handleChange}
            error={formik.errors.deviceName}
            touch={formik.touched.deviceName}
          />
          <InputSelectForm
            nameId="deviceType"
            optionList={OPTION_LIST_TYPE}
            name="Select device's type"
            value={formik.values.deviceType}
            handleOnChange={formik.handleChange}
            error={formik.errors.deviceType}
            touch={formik.touched.deviceType}
          />

          <InputForm
            nameId="deviceDes"
            name="Device's description"
            value={formik.values.deviceDes}
            handleOnChange={formik.handleChange}
            error={formik.errors.deviceDes}
            touch={formik.touched.deviceDes}
          />
          <InputForm
            nameId="serialnumberDevice"
            name="Device's serial number"
            value={formik.values.serialnumberDevice}
            handleOnChange={formik.handleChange}
            error={formik.errors.serialnumberDevice}
            touch={formik.touched.serialnumberDevice}
          />
          <p className="mb-2 text-center text-red-600">
            <span className="font-semibold text-red-700">Lưu ý: </span>Quá trình
            này sẽ mất vài phút do phải tạo và thiết lập kết nối giữa gateway
            với thiết bị!
          </p>
          {!isLoading ? (
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
              >
                Create a new device
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

FormCreateDevice.propTypes = {
  handleClickCLoseModal: PropTypes.func,
};

export default FormCreateDevice;
