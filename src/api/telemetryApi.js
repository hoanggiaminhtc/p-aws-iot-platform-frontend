import http from '~/util/http';

export const getDataTopic = (deviceId) => {
  return http.get(`/device/telemetry/gettopicdata/${deviceId}`);
};

export const getDataLastNDay = (body) => {
  return http.get(
    `/device/telemetry/getdatalastnday?deviceId=${body.deviceId}&date=${body.date}`,
  );
};
