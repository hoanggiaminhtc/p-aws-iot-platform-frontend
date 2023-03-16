import React, { memo } from 'react';

const Pagination = () => {
  return (
    <div>
      <ul className="inline-flex -space-x-px">
        <li>
          <a
            href="/"
            className="ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700  "
          >
            Previous
          </a>
        </li>
        <li>
          <a
            href="/"
            className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 text-blue-700 hover:bg-gray-100 hover:text-gray-700"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="/"
            className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700  "
          >
            2
          </a>
        </li>
        <li>
          <a
            href="/"
            className="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default memo(Pagination);
