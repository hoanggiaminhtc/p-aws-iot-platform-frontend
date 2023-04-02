import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  // FaRocket,
  FaTachometerAlt,
  // FaUsers,
  // FaServer,
  // FaBuilding,
  // FaDatabase,
  FaUserAlt,
  FaCogs,
  FaQuestionCircle,
  FaRoute,
  FaUsers,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ListSideBar = ({ hideMenu = false }) => {
  const { user } = useSelector((select) => select.user);

  return (
    <div className="w-full">
      <ul className="border-b-4 border-solid border-[#0C1821] text-sm font-bold text-[#709ABB]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'rounded-lg bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            }  transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaHome className="text-[#FF00FF]" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Home
          </div>
        </NavLink>
        <NavLink
          to="/gateways"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'rounded-lg bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            }  transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaRoute className="text-white" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Gateways
          </div>
        </NavLink>
        {/* <NavLink
          to="/devices"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            }  transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaRocket className="text-[#08B5FB]" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Devices
          </div>
        </NavLink> */}
        <NavLink
          to="/dashboards"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            }  transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'rounded-lg bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            }  transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaTachometerAlt className="text-[#009923]" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Dashboards
          </div>
        </NavLink>
        {/* <NavLink
          to="/data-buckets"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar  cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            } transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaDatabase className="text-[#BDC3C7]" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Data Buckets
          </div>
        </NavLink> */}
        {/* <NavLink
          to="/endpoints"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            } transitionSideBar  flex items-center justify-center font-black leading-10`}
          >
            <FaServer className="text-[#FFC40D]" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Endpoints
          </div>
        </NavLink>
        <NavLink
          to="/assets"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            } transitionSideBar  flex items-center justify-center font-black leading-10`}
          >
            <FaBuilding className="text-white" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Assets
          </div>
          </NavLink>*/}
        {user?.role === 1 && (
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `flex ${
                hideMenu ? 'pl-0' : 'pl-3'
              } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
                isActive && 'bg-[#000333] text-white'
              }`
            }
          >
            <div
              className={`${
                hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
              } transitionSideBar  flex items-center justify-center font-black leading-10`}
            >
              <FaUsers className="text-[#FFC40D]" />
            </div>
            <div
              className={`transitionSideBar flex items-center justify-center ${
                hideMenu ? 'hidden' : 'block'
              }`}
            >
              Customers
            </div>
          </NavLink>
        )}
      </ul>
      <div
        className={`transitionSideBar py-3 pl-3 text-left text-xs text-[#487497] ${
          hideMenu ? 'hidden' : 'block'
        }`}
      >
        Account
      </div>
      <ul className="text-sm font-bold text-[#709ABB]">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'rounded-lg bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            } transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaUserAlt className="text-[#27C24C]" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Profile
          </div>
        </NavLink>
        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'rounded-lg bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            } transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaCogs className="text-[#F05050]" />
          </div>
          <div
            className={`transitionSideBar flex items-center justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Setting
          </div>
        </NavLink>
        <NavLink
          to="/document"
          className={({ isActive }) =>
            `flex ${
              hideMenu ? 'pl-0' : 'pl-3'
            } transitionSideBar cursor-pointer hover:bg-[#000333] hover:text-white ${
              isActive && 'rounded-lg bg-[#000333] text-white'
            }`
          }
        >
          <div
            className={`${
              hideMenu ? 'h-[50px] w-16' : 'h-10 w-10'
            } transitionSideBar flex items-center justify-center font-black leading-10`}
          >
            <FaQuestionCircle className="text-[#23B7E5]" />
          </div>
          <div
            className={`transitionSideBar flex items-center  justify-center ${
              hideMenu ? 'hidden' : 'block'
            }`}
          >
            Document
          </div>
        </NavLink>
      </ul>
    </div>
  );
};

ListSideBar.propTypes = {
  hideMenu: PropTypes.bool,
};

export default ListSideBar;
