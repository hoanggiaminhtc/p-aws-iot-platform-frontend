import React, { Fragment, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ToastContain from '~/components/UI/ToastContain';
import { handleRegister } from '~/redux/slice/userSlice';
import Spinner from '~/components/UI/Spinner';

const FormRegister = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const refValidEmail = useRef(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('You must fill your name'),
      email: Yup.string()
        .email('Invalid email')
        .required('You must fill your email'),
      password: Yup.string()
        .min(10, 'Your password must be at least 10 characters')
        .required('You must fill your password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Your confirm password does not match!')
        .required('You must fill your confirm password '),
    }),
    onSubmit: (values) => {
      let emailTail = values.email.split('@')[1];
      if (emailTail !== 'thanglong.edu.vn') {
        refValidEmail.current.innerText = 'Email must be exam@thanglong.edu.vn';
        return;
      } else {
        dispatch(
          handleRegister({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        )
          .unwrap()
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            let messageErr = err.message || 'Đăng ký thất bại';
            toast.error(`${messageErr}!`);
          });
      }
    },
  });

  return (
    <Fragment>
      <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="Hoàng Gia Minh"
            value={formik.values.name}
            onChange={formik.handleChange}
            autoComplete="off"
          ></input>
          {formik.errors.name && formik.touched.name && (
            <p className="text-left text-red-600">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="exam@thanglong.edu.vn"
            value={formik.values.email}
            onChange={(e) => {
              if (refValidEmail.current) {
                refValidEmail.current.innerText = null;
              }
              formik.handleChange(e);
            }}
            autoComplete="off"
          ></input>
          {formik.errors.email && formik.touched.email && (
            <p className="text-left text-red-600">{formik.errors.email}</p>
          )}
          <p ref={refValidEmail} className="text-left text-red-600"></p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="off"
          ></input>
          {formik.errors.password && formik.touched.password && (
            <p className="text-left text-red-600">{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            autoComplete="off"
          ></input>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-left text-red-600">
              {formik.errors.confirmPassword}
            </p>
          )}
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
            Create an account
          </button>
        )}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to={'/log-in'}
            className="text-primary-600 font-medium text-blue-700 hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
      <ToastContain />
    </Fragment>
  );
};

export default FormRegister;
