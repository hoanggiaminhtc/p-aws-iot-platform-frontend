import React, { useEffect } from 'react';
import http from '~/util/http';

const HealthCheck = () => {
  useEffect(() => {
    http
      .get('/healthcheck')
      .then(() => {
        console.log('Health check pass');
      })
      .catch((err) => {
        console.log('Health check failed: ', err);
      });
  });

  return <div></div>;
};

export default HealthCheck;
