import InputForm from '~/components/UI/InputForm';
import InputSelectForm from '~/components/UI/InputSelectForm';

const OPTION_LIST_TYPE = [
  { name: "Choose a device's type", value: 'Default' },
  { name: 'Sensor', value: 'Sensor' },
  { name: 'Circuit Board', value: 'CircuitBoard' },
  { name: 'Engine', value: 'Engine' },
  { name: 'Resistor', value: 'Resistor' },
  { name: 'Other', value: 'Other' },
];

const FormCreateManyDevices = ({ formik, index }) => {
  return (
    <div className="px-6">
      <h1 className="mb-6 text-lg font-bold">{`Device ${index}`}</h1>
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
    </div>
  );
};

export default FormCreateManyDevices;
