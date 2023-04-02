import http from '~/util/http';

export const register = (body) => {
  return http.post('/admin/register', body);
};

export const getCustomers = () => {
  return http.get('/admin/getalluser');
};

export const deleteCustomer = (deletebyUserId) => {
  return http.delete(`/admin/deleteuser/${deletebyUserId}`);
};

export const getCustomerGateways = (idCustomer) => {
  return http.get(`/admin/getusergateway/${idCustomer}`);
};

export const getCustomerDevices = (idGateway) => {
  return http.get(`/admin/getuserdevice/${idGateway}`);
};
