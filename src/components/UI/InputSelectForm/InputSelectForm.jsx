import React, { memo } from 'react';
import PropTypes from 'prop-types';

const InputSelectForm = ({
  nameId,
  optionList,
  name,
  value,
  handleOnChange,
  error,
  touch,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={nameId}
        className="mb-2 block text-sm font-medium text-gray-500 dark:text-white"
      >
        {name}
      </label>
      <select
        id={nameId}
        name={nameId}
        value={value}
        onChange={handleOnChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-[#202124] dark:text-white"
      >
        {optionList.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && touch && <p className="text-left text-red-600">{error}</p>}
    </div>
  );
};

InputSelectForm.propTypes = {
  nameId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  error: PropTypes.string,
  touch: PropTypes.bool,
};

export default memo(InputSelectForm);
