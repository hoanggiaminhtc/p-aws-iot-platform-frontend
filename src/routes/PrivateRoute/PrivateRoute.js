import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTokenLocalStorage } from '~/util/handleLocalStorage';

const PrivateRoute = ({ children }) => {
  const token = getTokenLocalStorage();

  return token ? children : <Navigate to="/log-in" replace />;
};

export default PrivateRoute;
