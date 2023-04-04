import axios from 'axios';
import React, { useEffect } from 'react';

let healthcheck = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
});

const HealthCheck = () => {
  useEffect(() => {
    healthcheck
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
