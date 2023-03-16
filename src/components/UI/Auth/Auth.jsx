import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Auth = ({ children }) => {
  const { user } = useSelector((select) => select.user);

  return !user ? children : <Navigate to="/" replace />;
};

export default Auth;
