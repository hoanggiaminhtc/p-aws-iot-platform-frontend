import { useEffect } from 'react';
const url = 'https://httpstat.us/200';
const HealthCheck = () => {
  useEffect(() => {
    fetch(url).then((res) => {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': 2,
      });
      res.write('OK');
      res.end();
    });
  });
};

export default HealthCheck;
