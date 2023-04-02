import http from '~/util/http';

export const addGateWay = (body) => {
  return http.post('/gateway/add', body);
};

export const getGateWayList = () => {
  return http.get('/gateway/getall');
};

export const updateGateway = (id, body) => {
  return http.put(`/gateway/update/${id}`, body);
};

export const deleteGateWay = (id, body) => {
  return http.delete(`/gateway/delete/${id}`, body);
};

export const verifyGateway = (serialnumber, gatewayip) => {
  return http.post('/gateway/verifygateway', { serialnumber, gatewayip });
};
