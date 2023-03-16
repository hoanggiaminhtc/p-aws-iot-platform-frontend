import http from '~/util/http';

export const getListWidget = () => {
  return http.get('/dashboard/listWidgets');
};

export const getWidgets = (idDashboard) => {
  return http.get(`/dashboard/getone/${idDashboard}`);
};

export const addWidget = (body) => {
  return http.post('/dashboard/addwidget', body);
};

export const deleteWidget = (idWidget) => {
  return http.delete(`/dashboard/deletewidget/${idWidget}`);
};
