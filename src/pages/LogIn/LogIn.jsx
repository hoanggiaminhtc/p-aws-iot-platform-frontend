import React from 'react';

import BackgroundTitle from '~/assets/image/background_title.jpg';
import FormLogIn from './components/FormLogIn';
import Auth from '~/components/UI/Auth';

const LogIn = () => {
  return (
    <Auth>
      <div className="flex h-screen w-screen items-center justify-center bg-[#F0F3F4]">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 ">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <img
              src={BackgroundTitle}
              alt="background-title"
              className="mx-auto h-full max-h-[126px] w-full max-w-[126px] rounded-full border border-solid border-blue-600"
            />
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login
            </h1>
            <FormLogIn />
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default LogIn;
