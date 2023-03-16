import { useFormik } from 'formik';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { addDashboard } from '~/api/dashBoardApi';
import Modal from '~/components/Modal';
import InputForm from '~/components/UI/InputForm';

const FormCreateDashBoard = ({
  handleClickCLoseModal,
  handleAddSucess,
  type = null,
  initialValue = null,
  handleUpdateDashboard = null,
}) => {
  const formik = useFormik({
    initialValues: {
      dashBoardName: initialValue || '',
    },
    validationSchema: Yup.object({
      dashBoardName: Yup.string().required("You must fill dashboard's name"),
    }),
    onSubmit: (values) => {
      if (type === 'update') {
        handleUpdateDashboard(values.dashBoardName);
      } else {
        addDashboard({ name: values.dashBoardName })
          .then((data) => {
            toast.success('Tạo Dashboard thành công');
            handleAddSucess();
          })
          .catch((err) => {
            toast.error('Tạo Dashboard thất bại');
          });
      }
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
          <div className="pl-6">
            {type === 'update' ? 'Update dashboard' : 'Add a new dashboard'}
          </div>
          <div className="cursor-pointer pr-6" onClick={clickCloseModal}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="px-6">
          <InputForm
            nameId="dashBoardName"
            name="Dashboard's name"
            value={formik.values.dashBoardName}
            handleOnChange={formik.handleChange}
            error={formik.errors.dashBoardName}
            touch={formik.touched.dashBoardName}
          />
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              {type === 'update'
                ? 'Update Dashboard'
                : 'Create a new Dashboard'}
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

export default FormCreateDashBoard;
