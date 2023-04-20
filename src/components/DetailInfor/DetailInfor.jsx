/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';

const DetailInfor = ({
                       indexInput,
                       title,
                       infor,
                       type,
                       handleChangeInput,
                       color,
                     }) => {
  const handleCopy = (e) => {
    let topicTextCopy = e.currentTarget.nextElementSibling;
    let copyText = e.target.innerText;
    navigator.clipboard.writeText(copyText);
    topicTextCopy.textContent = 'Copied';
    const changeTextCopy = setTimeout(() => {
      topicTextCopy.textContent = 'Copy';
      clearTimeout(changeTextCopy);
    }, 1000);
  };

  const TypeInfor = {
    input: 'input',
    textarea: 'textarea',
  };
  let Tag = TypeInfor[type];

  return (
    <div className="sm:gridCustom my-4 grid grid-cols-2 text-base dark:bg-[#242526]">
      <div className="flex items-start justify-start text-black dark:text-white sm:justify-end">
        <div className="flex items-center font-bold sm:font-normal">
          {title}
          <FaInfoCircle className="ml-1 hidden sm:block" />
        </div>
      </div>
      {type === 'input' || type === 'textarea' ? (
        <Tag
          spellCheck="false"
          className="mr-8 flex items-center p-1 leading-5 text-black dark:bg-[#242526] dark:text-white"
          value={infor}
          rows="5"
          required
          onChange={(e) => {
            handleChangeInput(indexInput, e.target.value);
          }}
        ></Tag>
      ) : (
        ''
      )}
      {type === 'text' && (
        <p
          style={{ color: color }}
          className="mr-8 flex items-center leading-5 text-black dark:text-white"
        >
          {infor}
        </p>
      )}
      {!type && (
        <div className="topicText relative mr-8 max-w-[200px]">
          <div
            className="block cursor-pointer overflow-hidden text-ellipsis leading-5 text-black dark:text-white"
            onClick={handleCopy}
          >
            {infor}
          </div>
          <div className="topicTextCopy absolute top-[-100%] left-1/2 translate-x-[-50%] rounded-sm bg-slate-700 px-2 text-white opacity-0">
            Copy
          </div>
        </div>
      )}
    </div>
  );
};

DetailInfor.propTypes = {
  title: PropTypes.string,
  infor: PropTypes.string,
};

export default DetailInfor;
