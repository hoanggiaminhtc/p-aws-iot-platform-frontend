import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const FormSearch = ({
  handleSubmit,
  onHandleGet = () => {
    return;
  },
}) => {
  const [inputSearch, setInputSearch] = useState('');
  const handleChangeInput = (e) => {
    if (e.target.value.trim() === '') {
      onHandleGet();
    }
    setInputSearch(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(inputSearch);
      }}
    >
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none focus:border-[#132533]"
          placeholder="Search..."
          value={inputSearch}
          onChange={handleChangeInput}
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4  py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-blue-300 "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default FormSearch;
