import { useEffect } from 'react';
const url = 'https://httpstat.us/200';
const HealthCheck = () => {
  useEffect(() => {
    fetch(url).then((res) => {
      console.log(JSON.stringify(res.json()));
    });
  });
  return <div></div>;
};

export default HealthCheck;
