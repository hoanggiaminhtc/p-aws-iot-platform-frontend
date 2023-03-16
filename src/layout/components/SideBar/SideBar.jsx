import React from 'react';
import PropTypes from 'prop-types';

import LogoHeader from '../LogoHeader';
import ListSideBar from '../ListSideBar';

const SideBar = ({ hideMenu }) => {
  return (
    <div
      className={`w-full ${
        hideMenu ? 'max-w-[62px]' : 'max-w-[200px]'
      } min-h-screen bg-[#000A3D] mtb:hidden`}
    >
      <LogoHeader hideMenu={hideMenu} />
      <ListSideBar hideMenu={hideMenu} />
    </div>
  );
};

SideBar.propTypes = {
  hideMenu: PropTypes.bool,
};

export default SideBar;
