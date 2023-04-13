import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { addTopic } from '~/api/topicApi';
import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import SpinnerEllipsis from '~/components/UI/SpinnerEllipsis';

const FormTopic = ({ handleCloseModalTopic, idDevice, gatewayId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      topicName: '',
    },
    validationSchema: Yup.object({
      topicName: Yup.string()
        .min(6, 'Your topic must be at least 6 characters')
        .required("You must fill data stream's name"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      addTopic({
        deviceId: idDevice,
        topicname: values.topicName,
        gatewayId: gatewayId,
      })
        .then(() => {
          toast.success('Tạo topic thành công!', {
            theme: 'colored',
          });
        })
        .catch((err) => {
          toast.error('Tạo topic thất bại!', {
            theme: 'colored',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
      formik.handleReset();
    },
  });
  return (
    <Modal>
      <form
        className="w-1/2 rounded-md bg-white pb-5 dark:bg-[#202124]"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
          <div className="pl-6">Data Stream</div>
          <div className="cursor-pointer pr-6" onClick={handleCloseModalTopic}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="px-6">
          <InputForm
            nameId="topicName"
            name="Data stream name"
            value={formik.values.topicName}
            handleOnChange={formik.handleChange}
            error={formik.errors.topicName}
            touch={formik.touched.topicName}
          />
          {!isLoading ? (
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
              >
                Create a new data stream
              </button>
              <button
                type="button"
                className="ml-2 w-full rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                onClick={handleCloseModalTopic}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="text-center">
              <SpinnerEllipsis width="30px" height="30px" />
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};

FormTopic.propTypes = {
  handleCloseModalTopic: PropTypes.func,
  idDevice: PropTypes.string,
};

export default FormTopic;
