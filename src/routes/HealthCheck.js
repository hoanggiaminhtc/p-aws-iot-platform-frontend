const HealthCheck = () => {
  fetch(
    JSON.stringify(process.env.REACT_APP_API_ENDPOINT)+'/healthcheck'
  ).then((res) => res.json());
};

export default HealthCheck;
