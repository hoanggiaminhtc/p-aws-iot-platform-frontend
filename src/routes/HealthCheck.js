import { useEffect } from 'react';
const url = 'http://httpstat.us/200';
const HealthCheck = () => {
  useEffect(() => {
    fetch(url).then((res) => {
        return res.json();
      });
  });
};

export default HealthCheck;
