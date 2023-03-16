import React from 'react';
import { ToastContainer } from 'react-toastify';

const contextClass = {
  success: 'bg-[#060A52]',
  error: 'bg-[#D91E1E]',
  default: 'bg-indigo-600',
};

const ToastContain = () => {
  return (
    <ToastContainer
      toastClassName={({ type }) =>
        contextClass[type || 'default'] +
        ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
      }
      bodyClassName={() => 'text-sm font-white font-med flex p-3'}
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default ToastContain;
