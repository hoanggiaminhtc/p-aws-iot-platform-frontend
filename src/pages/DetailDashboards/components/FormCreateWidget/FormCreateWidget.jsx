/* eslint-disable prettier/prettier */
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getDevices } from '~/api/deviceApi';
import { getGateWayList } from '~/api/gateWayApi';
import { addWidget } from '~/api/widgetApi';
import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';
import InputSelectForm2 from '~/components/UI/InputSelectForm2';
import LoadingModal from '~/components/UI/LoadingModal';

const WIDGET_LIST = [
  { name: 'Card', value: 'Card' },
  // { name: 'Table', value: 'Table' },
  { name: 'Line Chart', value: 'LineChart' },
  { name: 'Button', value: 'button' },
  // { name: 'Doughnut Chart', value: 'DoughnutChart' },
  // { name: 'Pie Chart', value: 'PieChart' },
  // { name: 'Vertical Bar Chart', value: 'VerticalBarChart' },
];

const UNIT_OPTION = [
  {
    name: 'Đơn vị đo nhiệt độ °C',
    value: '°C',
  },
  {
    name: 'Đơn vị đo độ ẩm rH',
    value: 'rH',
  },
  { name: 'Đơn vị đo áp suất Pa', value: 'Pa' },
  { name: 'Đơn vị đo điện áp V', value: 'V' },
  { name: 'Đơn vị phần trăm %', value: '%' },
];

const FormCreateWidget = ({
  handleClickCLoseModal,
  deviceList,
  dashBoardId,
  onGetWidget,
}) => {
  const [formatGateway, setFormatGateway] = useState();
  const [formatDevice, setFormatDevice] = useState();
  // const [formatTopic, setFormatTopic] = useState();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      widgetName: '',
      widgetType: '',
      widgetGateway: '',
      widgetDevice: '',
      widgetUnit: '',
      messagehigh: '',
      messagelow: '',
      dashboardId: dashBoardId,
    },
    validationSchema: Yup.object({
      widgetName: Yup.string().required(),
      widgetType: Yup.string().required(),
      widgetGateway: Yup.string().required(),
      widgetUnit: Yup.string(),
      widgetDevice: Yup.string(),
      messagehigh: Yup.string(),
      messagelow: Yup.string(),
      dashboardId: Yup.string().required(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      let body = {
        name: values.widgetName,
        type: values.widgetType,
        device_id: values.widgetDevice,
        gatewayId: values.widgetGateway,
        dashboard_id: values.dashboardId,
      };
      if (values.widgetType === 'Card' || values.widgetType === 'LineChart') {
        body.unit = values.widgetUnit;
      }
      if (values.widgetType === 'button') {
        body.messagehigh = values.messagehigh;
        body.messagelow = values.messagelow;
      } else {
        body.device = values.widgetDevice;
      }
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
    getGateWayList().then((gateways) => {
      const gateway = gateways.data.data.gateway.map((gateway) => ({
        name: gateway.name,
        value: gateway._id,
      }));
      setFormatGateway(gateway);
    });
  }, []);

  useEffect(() => {
    if (formik.values.widgetGateway) {
      formik.values.widgetDevice = '';
      formik.values.widgetTopic = '';
      getDevices(formik.values.widgetGateway).then((devices) => {
        const device = devices.data.data.deviceinfo?.map((device) => ({
          name: device.name,
          value: device._id,
        }));
        setFormatDevice(device);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.widgetGateway]);

  // useEffect(() => {
  //   if (formik.values.widgetDevice) {
  //     formik.values.widgetTopic = '';
  //     getDevice(formik.values.widgetDevice).then((device) => {
  //       const { topic } = device.data.data;
  //       const topicF = topic.map((t) => ({
  //         name: t.topicname,
  //         value: t._id,
  //       }));
  //       setFormatTopic(topicF);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik.values.widgetDevice]);

  return (
    <>
      <Modal>
        <form
          className="rounded-md bg-white pb-5 dark:bg-[#202124] xs:w-[95%] sm:w-5/6 md:w-1/2"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-8 flex h-16 items-center justify-between bg-[#132533] text-2xl font-bold text-white">
            <div className="pl-6">Widget</div>
            <div className="cursor-pointer pr-6" onClick={clickCloseModal}>
              <AiOutlineClose />
            </div>
          </div>
          <div className="px-6 dark:bg-[#202124]">
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
              name="widgetGateway"
              title="Choose widget's Gateway"
              valueInput={formik.values.widgetGateway}
              option={formatGateway}
            />
            {formik.values.widgetType === 'LineChart' && (
              <InputSelectForm2
                onHandleSelectInput={handleSelectInput}
                name="widgetUnit"
                title="Choose widget's unit"
                valueInput={formik.values.widgetUnit}
                option={UNIT_OPTION}
              />
            )}
            {formik.values.widgetType === 'Card' && (
              <InputSelectForm2
                onHandleSelectInput={handleSelectInput}
                name="widgetUnit"
                title="Choose widget's unit"
                valueInput={formik.values.widgetUnit}
                option={UNIT_OPTION}
              />
            )}

            {formik.values.widgetGateway && (
              <InputSelectForm2
                onHandleSelectInput={handleSelectInput}
                name="widgetDevice"
                title="Choose widget's device"
                valueInput={formik.values.widgetDevice}
                option={formatDevice}
              />
            )}
            {/* {formik.values.widgetType === 'button' && (
              <InputForm
                nameId="messagehigh"
                name="Message High"
                value={formik.values.messagehigh}
                handleOnChange={formik.handleChange}
                error={formik.errors.messagehigh}
                touch={formik.touched.messagehigh}
              />
            )}
            {formik.values.widgetType === 'button' && (
              <InputForm
                nameId="messagelow"
                name="Message Low"
                value={formik.values.messagelow}
                handleOnChange={formik.handleChange}
                error={formik.errors.messagelow}
                touch={formik.touched.messagelow}
              />
            )} */}

            {/* {formik.values.widgetDevice &&
              formik.values.widgetType !== 'button' && (
                <InputSelectForm2
                  onHandleSelectInput={handleSelectInput}
                  name="widgetTopic"
                  title="Choose widget's topic"
                  valueInput={formik.values.widgetTopic}
                  option={formatTopic}
                />
              )} */}

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
