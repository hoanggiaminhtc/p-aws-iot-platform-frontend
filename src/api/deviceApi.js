import http from '~/util/http';

export const getDevices = (id) => {
  return http.get(`/device/getall/${id}`);
};

export const addDevice = (body, id) => {
  return http.post(`/device/add/${id}`, body);
};

export const deleteDevice = (idDevice) => {
  return http.delete(`/device/delete/${idDevice}`);
};

export const searchDevice = (nameDevice) => {
  return http.get(`/device/search?keyword=${nameDevice}`);
};

export const getDevice = (idDevice) => {
  return http.get(`/device/getone/${idDevice}`);
};

export const updateDevice = (idDevice, body) => {
  return http.put(`/device/update/${idDevice}`, body);
};
