import React, { useCallback, useState, memo } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Bottom from './components/Bottom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [hideMenu, setHideMenu] = useState(false);
  const location = useLocation();

  const handldeHideMenu = useCallback(() => {
    setHideMenu((pre) => !pre);
  }, []);

  const moveToTop = () => {
    window.scroll(0, 0);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="flex">
        <SideBar hideMenu={hideMenu} />
        <div className="flex-1 dark:bg-[#242526]">
          <NavBar handldeHideMenu={handldeHideMenu} />
          <div className="min-h-screen w-full">{children}</div>
          <Bottom />
        </div>
      </div>
      <button
        onClick={moveToTop}
        className="fixed bottom-10 left-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white"
      >
        <AiOutlineArrowUp className="text-base" />
      </button>
    </>
  );
};

export default memo(Layout);
