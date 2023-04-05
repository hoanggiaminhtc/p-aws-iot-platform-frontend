import { useEffect } from 'react';
const url = 'https://httpstat.us/200';
let result;
const HealthCheck = () => {
  useEffect(() => {
    fetch(url).then((res) => {
      result = JSON.stringify(res.json());
    });
  });
  return <div>result</div>;
};

export default HealthCheck;
