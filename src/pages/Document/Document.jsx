import React, { useEffect } from 'react';

const Document = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return <div>Đây là trang document</div>;
};

export default Document;
