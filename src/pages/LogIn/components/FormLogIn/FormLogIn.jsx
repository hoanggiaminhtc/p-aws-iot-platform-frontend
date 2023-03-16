import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ToastContain from '~/components/UI/ToastContain';

import Spinner from '~/components/UI/Spinner';
import { handleLogin } from '~/redux/slice/userSlice';

const FormLogIn = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('You must fill your email'),
      password: Yup.string().required('You must fill your password'),
    }),
    onSubmit: (values) => {
      dispatch(handleLogin(values))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          let messageErr = err.message || 'Đăng nhập thất bại';
          toast.error(`${messageErr}!`);
        });
    },
  });

  return (
    <Fragment>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-left text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="name@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="off"
          ></input>
          {formik.errors.email && formik.touched.email && (
            <p className="text-left text-red-600">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-left text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="off"
          ></input>
          {formik.errors.password && formik.touched.password && (
            <p className="text-left text-red-600">{formik.errors.password}</p>
          )}
        </div>
        <div className="flex items-start">
          {/* <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 "
              ></input>
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 "
            >
              Remember me
            </label>
          </div> */}
          <div></div>
          <a
            href="/lost-password"
            className="ml-auto text-sm text-blue-700 hover:underline "
          >
            Lost Password?
          </a>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner width="w-8" height="h-8" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        )}
        <div className="text-sm font-medium text-gray-500 ">
          Not registered?{' '}
          <Link to={'/register'} className="text-blue-700 hover:underline ">
            Create account
          </Link>
        </div>
      </form>
      <ToastContain />
    </Fragment>
  );
};

export default FormLogIn;
