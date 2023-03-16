import http from '~/util/http';

export const getDataTopic = (idTopic) => {
  return http.get(`/device/telemetry/gettopicdata/${idTopic}`);
};

export const getDataLastNDay = (body) => {
  return http.get('/device/telemetry/getdatalastnday', { params: body });
};
