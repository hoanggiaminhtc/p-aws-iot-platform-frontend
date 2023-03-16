import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getDevices } from '~/api/deviceApi';
import { getTopics } from '~/api/topicApi';
import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import InputSelectForm from '~/components/UI/InputSelectForm';
import InputSelectForm2 from '~/components/UI/InputSelectForm2';

const OPTION_LIST_SOURCE = [
  { name: 'Choose a data source', value: '' },
  { name: 'From Device Resource', value: 'resourceDevice' },
  { name: 'From MQTT Topic', value: 'resourceTopic' },
];

const FormCreateDataBucket = ({
  handleClickCLoseModal,
  handleAddSucess,
  initialValue = null,
}) => {
  const [formatDevice, setFormatDevice] = useState();
  const [formatTopic, setFormatTopic] = useState();
  const formik = useFormik({
    initialValues: {
      dataBucketId: initialValue || '',
      dataBucketName: initialValue || '',
      dataBucketSource: initialValue || '',
      dataBucketDevice: initialValue || '',
      dataBucketTopic: initialValue || '',
    },
    validationSchema: Yup.object({
      dataBucketId: Yup.string().required("You must fill databuket's id"),
      dataBucketName: Yup.string().required("You must fill databucket's name"),
      dataBucketSource: Yup.string().required(
        "You must fill databucket's source",
      ),
      dataBucketDevice: Yup.string(),
      dataBucketTopic: Yup.string(),
    }),
    onSubmit: (values) => {
      if (values.dataBucketSource && values.dataBucketDevice) {
        console.log('Device : ', values.dataBucketDevice);
        toast.success('Thêm bucket thành công');
      } else if (values.dataBucketSource && values.dataBucketTopic) {
        console.log('Topic : ', values.dataBucketTopic);
        toast.success('Thêm bucket thành công');
      } else {
        return;
      }
    },
  });
  const clickCloseModal = () => {
    formik.handleReset();
    handleClickCLoseModal();
  };

  const handleSelectInput = (name, value) => {
    formik.setValues((pre) => {
      return { ...pre, [name]: value };
    });
  };

  useEffect(() => {
    if (formik.values.dataBucketSource === 'resourceDevice') {
      formik.values.dataBucketTopic = '';
      getDevices().then((data) => {
        setFormatDevice(
          data.data.data.device.map((device) => ({
            name: device.name,
            value: device._id,
          })),
        );
      });
    } else if (formik.values.dataBucketSource === 'resourceTopic') {
      formik.values.dataBucketDevice = '';
      getTopics().then((data) => {
        console.log('Data Topic List : ', data.data.topics);
        setFormatTopic(
          data.data.topics.map((topic) => ({
            name: topic.topicname,
            value: topic._id,
          })),
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.dataBucketSource]);

  return (
    <Modal>
      <form
        className="rounded-md bg-white pb-5 xs:w-[95%] sm:w-5/6 md:w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
          <div className="pl-6">Add a new data bucket</div>
          <div className="cursor-pointer pr-6" onClick={clickCloseModal}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="px-6">
          <InputForm
            nameId="dataBucketId"
            name="Data Bucket's Id"
            value={formik.values.dataBucketId}
            handleOnChange={formik.handleChange}
            error={formik.errors.dataBucketId}
            touch={formik.touched.dataBucketId}
          />
          <InputForm
            nameId="dataBucketName"
            name="Data Bucket's Name"
            value={formik.values.dataBucketName}
            handleOnChange={formik.handleChange}
            error={formik.errors.dataBucketName}
            touch={formik.touched.dataBucketName}
          />
          <InputSelectForm
            nameId="dataBucketSource"
            optionList={OPTION_LIST_SOURCE}
            name="Select data source"
            value={formik.values.dataBucketSource}
            handleOnChange={formik.handleChange}
            error={formik.errors.dataBucketSource}
            touch={formik.touched.dataBucketSource}
          />
          {formik.values.dataBucketSource === 'resourceDevice' && (
            <InputSelectForm2
              onHandleSelectInput={handleSelectInput}
              name="dataBucketDevice"
              title="Choose bucket's device"
              valueInput={formik.values.dataBucketDevice}
              option={formatDevice}
            />
          )}
          {formik.values.dataBucketSource === 'resourceTopic' && (
            <InputSelectForm2
              onHandleSelectInput={handleSelectInput}
              name="dataBucketTopic"
              title="Choose bucket's topic"
              valueInput={formik.values.dataBucketTopic}
              option={formatTopic}
            />
          )}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              Create a new Data Bucket
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

export default FormCreateDataBucket;
