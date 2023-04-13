import http from '~/util/http';

export const addDashboard = (body) => {
  return http.post('/dashboard/add', body);
};

export const getAllDashBoard = () => {
  return http.get('/dashboard/getall');
};

export const getDashboard = (idDashBoard) => {
  return http.get(`/dashboard/getone/${idDashBoard}`);
};

export const deleteDashBoard = (idDashBoard) => {
  return http.delete(`/dashboard/delete/${idDashBoard}`);
};

export const updateDashBoard = (idDashBoard, body) => {
  return http.put(`/dashboard/update/${idDashBoard}`, body);
};
