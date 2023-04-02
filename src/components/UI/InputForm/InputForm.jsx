import React, { memo } from 'react';

const InputForm = ({
  type = 'text',
  nameId,
  name,
  value,
  handleOnChange,
  error,
  touch,
  min,
}) => {
  return (
    <div className="group relative z-0 mb-6 w-full">
      <input
        type={type}
        name={nameId}
        id={nameId}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white"
        placeholder=" "
        value={value}
        onChange={handleOnChange}
        min={min}
      />
      {error && touch && <p className="text-left text-red-600">{error}</p>}
      <label
        htmlFor={nameId}
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-white"
      >
        {name}
      </label>
    </div>
  );
};

/*InputForm.propTypes = {
  type: PropTypes.string,
  nameId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  error: PropTypes.string,
  touch: PropTypes.bool,
};*/

export default memo(InputForm);
