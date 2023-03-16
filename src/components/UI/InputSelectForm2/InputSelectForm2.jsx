import React, { useMemo, useRef } from 'react';

const InputSelectForm2 = ({
  onHandleSelectInput,
  name,
  title,
  valueInput,
  option,
  disable,
}) => {
  const ulRef = useRef();

  const handleClickOpenSelect = () => {
    if (ulRef.current.style.display === 'block') {
      ulRef.current.style.display = 'none';
    } else {
      ulRef.current.style.display = 'block';
    }
  };
  const handleClick = (e, name, value) => {
    e.stopPropagation();
    onHandleSelectInput(name, value);
    ulRef.current.style.display = 'none';
  };

  const inputChoose = useMemo(() => {
    if (option) {
      const result = option.find((data) => data.value === valueInput);
      return result ? result.name : '';
    } else {
      return '';
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueInput]);

  return (
    <div className="mb-7">
      <div
        className={`relative flex w-full cursor-pointer justify-between rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
          disable && 'pointer-events-none'
        }`}
        onClick={handleClickOpenSelect}
      >
        <div>{valueInput === '' ? title : inputChoose}</div>
        <div>
          <svg
            className="ml-2 h-4 w-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <ul
          className={`absolute ${
            option ? 'top-[calc(100%_+_2px)]' : 'top-full'
          } left-0 right-0 z-10 hidden max-h-32 overflow-y-auto border-l-2 border-r-2 border-b-2 border-solid border-gray-400 bg-white text-base text-gray-700`}
          ref={ulRef}
        >
          {option?.map((data, index) => {
            return (
              <li
                key={index}
                onClick={(e) => handleClick(e, name, data.value)}
                className="cursor-pointer py-1 pl-2.5 hover:bg-gray-300"
              >
                {data.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InputSelectForm2;
