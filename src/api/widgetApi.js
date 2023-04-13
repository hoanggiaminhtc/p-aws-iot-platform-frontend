import http from '~/util/http';

export const getListWidget = () => {
  return http.get('/widget/listWidgets');
};

export const getWidgets = (idDashboard) => {
  return http.get(`/dashboard/getone/${idDashboard}`);
};

export const getOneWidget = (widgetId) => {
  return http.get(`/widget/getonewidget/${widgetId}`);
};

export const addWidget = (body) => {
  return http.post('/widget/addwidget', body);
};

export const deleteWidget = (idWidget) => {
  return http.delete(`/widget/deletewidget/${idWidget}`);
};

export const turnOn = (widgetId) => {
  return http.get(`/widget/gpiohigh/${widgetId}`);
};
export const turnOff = (widgetId) => {
  return http.get(`/widget/gpiolow/${widgetId}`);
};
