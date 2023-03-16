import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getDevice } from '~/api/deviceApi';
import { addWidget } from '~/api/widgetApi';
import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import InputSelectForm2 from '~/components/UI/InputSelectForm2';
import LoadingModal from '~/components/UI/LoadingModal';

const WIDGET_LIST = [
  { name: 'Card', value: 'Card' },
  // { name: 'Table', value: 'Table' },
  { name: 'Line Chart', value: 'LineChart' },
  // { name: 'Doughnut Chart', value: 'DoughnutChart' },
  // { name: 'Pie Chart', value: 'PieChart' },
  // { name: 'Vertical Bar Chart', value: 'VerticalBarChart' },
];

const FormCreateWidget = ({
  handleClickCLoseModal,
  deviceList,
  dashBoardId,
  onGetWidget,
}) => {
  const [formatDevice, setFormatDevice] = useState();
  const [formatTopic, setFormatTopic] = useState();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      widgetName: '',
      widgetType: '',
      widgetDevice: '',
      widgetTopic: '',
      dashboardId: dashBoardId,
    },
    validationSchema: Yup.object({
      widgetName: Yup.string().required(),
      widgetType: Yup.string().required(),
      widgetDevice: Yup.string().required(),
      widgetTopic: Yup.string().required(),
      dashboardId: Yup.string().required(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const body = {
        name: values.widgetName,
        type: values.widgetType,
        device: values.widgetDevice,
        topic: values.widgetTopic,
        dashboard_id: values.dashboardId,
      };
      addWidget(body)
        .then((data) => {
          toast.success('Thêm widget thành công');
          onGetWidget(dashBoardId);
          formik.handleReset();
        })
        .catch((err) => {
          toast.error('Thêm widget thất bại');
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const clickCloseModal = (e) => {
    e.stopPropagation();
    formik.handleReset();
    handleClickCLoseModal();
  };

  const handleSelectInput = (name, value) => {
    formik.setValues((pre) => {
      return { ...pre, [name]: value };
    });
  };

  useEffect(() => {
    if (deviceList && deviceList.length > 0) {
      setFormatDevice(
        deviceList.map((device) => ({
          name: device.name,
          value: device._id,
        })),
      );
    }
  }, [deviceList]);

  useEffect(() => {
    formik.values.widgetTopic = '';
    if (formik.values.widgetDevice.trim() !== '') {
      getDevice(formik.values.widgetDevice)
        .then((data) => {
          if (data.data.data.topic.length > 0) {
            const topics = data.data.data.topic.map((topic) => ({
              name: topic.topicname,
              value: topic._id,
            }));
            setFormatTopic(topics);
          } else {
            setFormatTopic(null);
          }
        })
        .catch((err) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.widgetDevice]);

  return (
    <>
      <Modal>
        <form
          className="rounded-md bg-white pb-5 xs:w-[95%] sm:w-5/6 md:w-1/2"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
            <div className="pl-6">Add new widget</div>
            <div className="cursor-pointer pr-6" onClick={clickCloseModal}>
              <AiOutlineClose />
            </div>
          </div>
          <div className="px-6">
            <InputForm
              nameId="widgetName"
              name="Widget's name"
              value={formik.values.widgetName}
              handleOnChange={formik.handleChange}
              error={formik.errors.widgetName}
              touch={formik.touched.widgetName}
            />
            <InputSelectForm2
              onHandleSelectInput={handleSelectInput}
              name="widgetType"
              title="Choose widget's type"
              valueInput={formik.values.widgetType}
              option={WIDGET_LIST}
            />
            <InputSelectForm2
              onHandleSelectInput={handleSelectInput}
              name="widgetDevice"
              title="Choose widget's device"
              valueInput={formik.values.widgetDevice}
              option={formatDevice}
            />
            <InputSelectForm2
              onHandleSelectInput={handleSelectInput}
              name="widgetTopic"
              title="Choose widget's topic"
              valueInput={formik.values.widgetTopic}
              option={formatTopic}
              disable={formik.values.widgetDevice.trim() === '' ? true : false}
            />

            <div className="mt-6 flex items-center justify-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
              >
                Create a new Widget
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
      {loading && <LoadingModal />}
    </>
  );
};
FormCreateWidget.propTypes = {
  handleClickCLoseModal: PropTypes.func,
};
export default FormCreateWidget;
