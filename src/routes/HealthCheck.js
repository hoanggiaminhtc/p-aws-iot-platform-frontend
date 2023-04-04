import axios from 'axios';
import React, { useEffect } from 'react';

const HealthCheck = () => {
  useEffect(() => {
    axios
      .get('/healthcheck')
      .then(() => {
        console.log('Health check pass');
      })
      .catch((err) => {
        console.log('Health check failed');
      });
  });

  return <div></div>;
};

export default HealthCheck;
