import PropTypes from 'prop-types';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const Notification = ({
  success,
  btnName,
  textTitle,
  textContent,
  handleClick,
}) => {
  return (
    <div className="flex w-auto max-w-sm flex-col items-center rounded-md bg-white px-4 py-8">
      <div>
        {success ? (
          <AiFillCheckCircle className="h-14 w-14 text-green-700" />
        ) : (
          <AiFillCloseCircle className="h-14 w-14 text-red-700" />
        )}
      </div>
      <div className="mt-3 text-xl text-green-600">{textTitle}</div>
      <div className="my-3 text-center text-base">{textContent}</div>
      <button
        className="mt-2 rounded-md bg-[#060A52] px-3 py-2 text-white"
        onClick={handleClick}
      >
        {btnName}
      </button>
    </div>
  );
};

Notification.propTypes = {
  err: PropTypes.bool,
  success: PropTypes.bool,
  btnName: PropTypes.string,
  textTitle: PropTypes.string,
  textContent: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Notification;
