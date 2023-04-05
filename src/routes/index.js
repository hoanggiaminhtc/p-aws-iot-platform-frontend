import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '~/layout';
import LazyLoading from '~/components/LazyLoading';

import PrivateRoute from './PrivateRoute';
import NotificationAuthen from '~/pages/NotificationAuthen';
import LogIn from '~/pages/LogIn';
import LostPassword from '~/pages/LostPassword';
// import Register from '~/pages/Register';
import GateWays from '~/pages/GateWays';
import DeviceList from '~/pages/DeviceList';
//import HealthCheck from './HealthCheck';

const Home = React.lazy(() => import('~/pages/Home'));
// const Devices = React.lazy(() => import('~/pages/Devices'));
const DetailDevice = React.lazy(() => import('~/pages/DetailDevice'));
const Dashboards = React.lazy(() => import('~/pages/Dashboards'));
const DetailDashboards = React.lazy(() => import('~/pages/DetailDashboards'));
const ShareWidget = React.lazy(() => import('~/pages/ShareWidget'));
const Customers = React.lazy(() => import('~/pages/Customers'));
const ListCustomers = React.lazy(() => import('~/pages/ListCustomers'));
const CustomerDevices = React.lazy(() => import('~/pages/CustomerDevices'));
const CustomerDevice = React.lazy(() =>
  import('~/pages/CustomerDevices/CustomerDevice'),
);
const Profile = React.lazy(() => import('~/pages/Profile'));
const Setting = React.lazy(() => import('~/pages/Setting'));
const Document = React.lazy(() => import('~/pages/Document'));
const NotFound = React.lazy(() => import('~/pages/NotFound'));

const MainRoutes = () => {
  const routes = [
    {
      path: '/',
      element: Home,
      isLayout: true,
    },
    {
      path: '/log-in',
      element: LogIn,
      isLayout: false,
    },
    {
      path: '/lost-password',
      element: LostPassword,
      isLayout: false,
    },
    {
      path: '/gateways',
      element: GateWays,
      isLayout: true,
    },
    {
      path: '/gateways/:id',
      element: DeviceList,
      isLayout: true,
    },
    {
      path: '/devices/:id',
      element: DetailDevice,
      isLayout: true,
    },
    {
      path: '/dashboards',
      element: Dashboards,
      isLayout: true,
    },
    {
      path: '/dashboard/:id',
      element: DetailDashboards,
      isLayout: true,
    },
    {
      path: '/share/:id',
      element: ShareWidget,
      isLayout: false,
    },
    {
      path: '/customers',
      element: Customers,
      isLayout: true,
    },
    {
      path: '/customers-list',
      element: ListCustomers,
      isLayout: true,
    },
    {
      path: '/customer-gateways/:id',
      element: CustomerDevices,
      isLayout: true,
    },
    {
      path: '/customer-devices/:id',
      element: CustomerDevice,
      isLayout: true,
    },
    {
      path: '/profile',
      element: Profile,
      isLayout: true,
    },
    {
      path: '/setting',
      element: Setting,
      isLayout: true,
    },
    {
      path: '/document',
      element: Document,
      isLayout: true,
    },
    {
      path: '/authentication',
      element: NotificationAuthen,
      isLayout: false,
    },
    {
      path: '*',
      element: NotFound,
      isLayout: false,
    },
  ];
  return (
    <Routes>
      <Route path="/health"></Route>
      {routes.map((route, index) => {
        let Element = route.element;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.isLayout ? (
                <PrivateRoute>
                  <Layout>
                    <React.Suspense fallback={<LazyLoading />}>
                      <Element />
                    </React.Suspense>
                  </Layout>
                </PrivateRoute>
              ) : (
                <React.Suspense fallback={<LazyLoading />}>
                  <Element />
                </React.Suspense>
              )
            }
          ></Route>
        );
      })}
    </Routes>
  );
};

export default MainRoutes;
