import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import { FaIndent } from 'react-icons/fa';
import { ImMenu } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { BiMoon, BiSun } from 'react-icons/bi';
import NoneAvatar from '~/assets/image/none_avatar.png';
import Img from '~/components/UI/Img';
import { changeTheme } from '~/redux/slice/themeSlice';
import ListSideBar from '../ListSideBar';
import LogoHeader from '../LogoHeader';

const NavBar = ({ handldeHideMenu }) => {
  const location = useLocation();
  const slicePathName = location.pathname.substring(1).split('/')[0];
  const { user } = useSelector((selector) => selector.user);

  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useSelector((select) => select.theme);

  useEffect(() => {
    if (slicePathName === '') {
      document.title = 'Home';
    } else {
      document.title = `${slicePathName
        .charAt(0)
        .toUpperCase()}${slicePathName.slice(1)}`;
    }
  }, [slicePathName]);

  const handleChangeTheme = () => {
    dispatch(changeTheme());
    // const element = document.documentElement;
    // if (themeDark) {
    //   element.classList.remove('dark');
    // } else {
    //   element.classList.add('dark');
    // }
    // setThemeDark((pre) => !pre);
  };

  return (
    <div>
      <div className="h-12 mtb:bg-[#132533]">
        <div className="dark:border-black' flex h-full items-center justify-between border-b-2 border-solid pl-4 dark:bg-[#202124] mtb:hidden">
          <div
            className="flex h-full cursor-pointer items-center px-[15px]"
            onClick={handldeHideMenu}
          >
            <FaIndent className="text-[#58666E] dark:text-[#E3E4E6]" />
          </div>
          <div className="flex items-center py-4">
            <div
              onClick={handleChangeTheme}
              className="relative mr-4 h-5 w-10 cursor-pointer rounded-full bg-gray-500 dark:bg-blue-500"
            >
              <div className="absolute left-0 flex h-full w-1/2 items-center justify-center rounded-full bg-white shadow-2xl transition-all dark:left-1/2">
                {theme === 'dark' ? <BiMoon /> : <BiSun />}
              </div>
            </div>
            <Link to="/profile">
              <div className="flex cursor-pointer items-center px-4 py-1 transition-all hover:bg-[#0000000d] dark:hover:bg-black">
                <div className="mr-6 text-[#58666e] dark:text-white">
                  {user?.userName}
                </div>
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
