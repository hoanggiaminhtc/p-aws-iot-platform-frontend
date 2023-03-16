import http from '~/util/http';

export const getDataTempletry = (topic) => {
  return http.get(`/device/telemetry/getdevicedata/${topic}`);
};
