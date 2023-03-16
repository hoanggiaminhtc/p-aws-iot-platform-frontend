import React, { useCallback, useState, memo } from 'react';

import SideBar from './components/SideBar';
import NavBar from './components/NavBar';

const Layout = ({ children }) => {
  const [hideMenu, setHideMenu] = useState(false);

  const handldeHideMenu = useCallback(() => {
    setHideMenu((pre) => !pre);
  }, []);

  return (
    <div className="flex">
      <SideBar hideMenu={hideMenu} />
      <div className="flex-1">
        <NavBar handldeHideMenu={handldeHideMenu} />
        {children}
      </div>
    </div>
  );
};

export default memo(Layout);
