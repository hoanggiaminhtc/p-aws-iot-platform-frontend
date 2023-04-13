import PropTypes from 'prop-types';
import { useState } from 'react';
// import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { AiOutlineClose } from 'react-icons/ai';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addGateWay } from '~/api/gateWayApi';
import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import SpinnerEllipsis from '~/components/UI/SpinnerEllipsis';
// import FormCreateManyDevices from '../FormCreateManyDevices';
// import { addDevice } from '~/api/deviceApi';

const FormCreateGateway = ({ handleClickCLoseModal, handleAddSucess }) => {
  const { user } = useSelector((select) => select.user);
  const [isLoading, setIsLoading] = useState(false);
  // const devicesList = useRef([]);
  // const [currenFormDevice, setCurrenFormDevice] = useState(0);
  const formik = useFormik({
    initialValues: {
      gateWayName: '',
      gateWayDes: '',
      serialnumber: 0,
    },
    validationSchema: Yup.object({
      gateWayName: Yup.string().required("You must fill gateway's name"),
      gateWayDes: Yup.string().required("You must fill gateway's description"),
      serialnumber: Yup.number().required(
        'You must fill the serial number connection',
      ),
    }),
    onSubmit: (values) => {
      // const devices = devicesList.current.map((device) => ({
      //   name: device.deviceName,
      //   type: device.deviceType,
      //   description: device.deviceDes,
      // }));
      // devices.push({
      //   name: formikDevice.values.deviceName,
      //   type: formikDevice.values.deviceType,
      //   description: formikDevice.values.deviceDes,
      // });

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

  // const formikDevice = useFormik({
  //   initialValues: {
  //     deviceName: '',
  //     deviceDes: '',
  //     deviceType: 'Default',
  //   },
  //   validationSchema: Yup.object({
  //     deviceName: Yup.string().required("You must fill device's name"),
  //     deviceType: Yup.string().required("You must fill device's type"),
  //     deviceDes: Yup.string(),
  //   }),
  // });

  const clickCloseModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.resetForm();
    // formikDevice.resetForm();
    // setCurrenFormDevice(0);
    handleClickCLoseModal();
  };

  // const handleNextForm = (e) => {
  //   e.preventDefault();
  //   if (currenFormDevice + 1 > formik.values.getWayLimitDevice) {
  //     return;
  //   }
  //   if (currenFormDevice !== 0) {
  //     if (devicesList.current[currenFormDevice - 1]) {
  //       let newOnjectDevice = {
  //         ...formikDevice.values,
  //       };
  //       devicesList.current[currenFormDevice - 1] = newOnjectDevice;
  //     } else {
  //       let newOnjectDevice = {
  //         ...formikDevice.values,
  //       };
  //       devicesList.current.push(newOnjectDevice);
  //     }
  //   }
  //   formikDevice.values.deviceName = '';
  //   formikDevice.values.deviceType = '';
  //   formikDevice.values.deviceDes = '';
  //   if (devicesList.current[currenFormDevice]) {
  //     formikDevice.values.deviceName =
  //       devicesList.current[currenFormDevice].deviceName;
  //     formikDevice.values.deviceType =
  //       devicesList.current[currenFormDevice].deviceType;
  //     formikDevice.values.deviceDes =
  //       devicesList.current[currenFormDevice].deviceDes;
  //   }
  //   setCurrenFormDevice(currenFormDevice + 1);
  // };

  // const handlePreForm = (e) => {
  //   e.preventDefault();
  //   if (currenFormDevice - 1 < 0) {
  //     return;
  //   }
  //   if (devicesList.current[currenFormDevice - 2]) {
  //     formikDevice.values.deviceName =
  //       devicesList.current[currenFormDevice - 2].deviceName;
  //     formikDevice.values.deviceType =
  //       devicesList.current[currenFormDevice - 2].deviceType;
  //     formikDevice.values.deviceDes =
  //       devicesList.current[currenFormDevice - 2].deviceDes;
  //   }
  //   setCurrenFormDevice(currenFormDevice - 1);
  // };

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
        {/* {currenFormDevice === 0 && (
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
              min="1"
            />
          </div>
        )}

        {currenFormDevice > 0 && (
          <FormCreateManyDevices
            formik={formikDevice}
            index={currenFormDevice}
          />
        )}
        {!isLoading ? (
          <div className="flex items-center justify-end pr-6">
            {currenFormDevice > 1 && (
              <button
                type="button"
                className="mr-2 w-full rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                onClick={handlePreForm}
              >
                Pre
              </button>
            )}
            {currenFormDevice === formik.values.getWayLimitDevice &&
            currenFormDevice > 0 ? (
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
              >
                Create a new gateway
              </button>
            ) : (
              <button
                type="button"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                onClick={handleNextForm}
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <SpinnerEllipsis />
          </div>
        )} */}
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
            type="number"
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
