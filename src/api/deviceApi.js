import http from '~/util/http';

export const getDevices = () => {
  return http.get('/device/getall');
};

export const addDevice = (body) => {
  return http.post('/device/add', body);
};

export const deleteDevice = (idDevice) => {
  console.log('Vao ham xoa thiet bi');
  console.log('Deviec Id :', idDevice);
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
