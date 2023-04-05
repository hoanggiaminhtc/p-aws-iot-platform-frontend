import React from 'react';
const HealthCheck = () => {
  return (
    <>
      status: 200
      <br />
      environment: {process.env.NODE_ENV}
    </>
  )
}

export default HealthCheck;
