import http from '~/util/http';

export const getListWidget = () => {
  return http.get('/dashboard/listWidgets');
};

export const getWidgets = (idDashboard) => {
  return http.get(`/dashboard/getone/${idDashboard}`);
};

export const getOneWidget = (widgetId) => {
  return http.get(`/dashboard/getonewidget/${widgetId}`);
};

export const addWidget = (body) => {
  return http.post('/dashboard/addwidget', body);
};

export const deleteWidget = (idWidget) => {
  return http.delete(`/dashboard/deletewidget/${idWidget}`);
};

export const turnOn = (widgetId) => {
  return http.get(`/dashboard/gpiohigh/${widgetId}`);
};
export const turnOff = (widgetId) => {
  return http.get(`/dashboard/gpiolow/${widgetId}`);
};
