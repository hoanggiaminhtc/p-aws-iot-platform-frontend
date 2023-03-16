import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { FaIndent } from 'react-icons/fa';
import { ImMenu } from 'react-icons/im';
import { useSelector } from 'react-redux';

import LogoHeader from '../LogoHeader';
import ListSideBar from '../ListSideBar';
import Img from '~/components/UI/Img';
import NoneAvatar from '~/assets/image/none_avatar.png';

const NavBar = ({ handldeHideMenu }) => {
  const location = useLocation();
  const slicePathName = location.pathname.substring(1).split('/')[0];
  console.log({ slicePathName });
  const { user } = useSelector((selector) => selector.user);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (slicePathName === '') {
      document.title = 'Home';
    } else {
      document.title = `${slicePathName
        .charAt(0)
        .toUpperCase()}${slicePathName.slice(1)}`;
    }
  }, [slicePathName]);

  console.log({ slicePathName });

  return (
    <div>
      <div className="h-12 mtb:bg-[#132533]">
        <div className="flex h-full items-center justify-between pl-4 mtb:hidden">
          <div
            className="flex h-full cursor-pointer items-center px-[15px] hover:bg-[#F0F3F4]"
            onClick={handldeHideMenu}
          >
            <FaIndent className="text-[#58666E]" />
          </div>
          <div>
            <Link to="/profile">
              <div className="flex cursor-pointer items-center px-4 py-1 hover:bg-[rgba(0,0,0,.05)]">
                <div className="mr-6 text-[#58666e]">{user?.userName}</div>
                <div className="h-10 w-10 rounded-full">
                  <Img
                    linkImg={user?.avatarUrl || NoneAvatar}
                    name="avatar"
                    shape="rounded-full"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="relative z-[1000] hidden h-full items-center justify-between mtb:flex">
          <LogoHeader />
          <div
            className="flex h-full cursor-pointer items-center px-[15px]"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <ImMenu className="text-[#5F8EB3]" />
          </div>
          <div
            className={`absolute top-full w-full bg-[#132533] pb-2 ${
              showMenu ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            <ListSideBar hideMenu={false}></ListSideBar>
          </div>
        </div>
      </div>
      <div
        className={`h-12 items-center bg-[#F8F8F8] pl-4 capitalize text-[##333333] ${
          slicePathName === 'dashboard' || 'gateways' ? 'hidden' : 'flex'
        }`}
      >
        {slicePathName === '' ? 'Home' : slicePathName}
      </div>
    </div>
  );
};

NavBar.propTypes = {
  handldeHideMenu: PropTypes.func,
};

export default memo(NavBar);
