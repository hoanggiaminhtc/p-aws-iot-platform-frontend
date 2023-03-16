import http from '~/util/http';

export const getTopics = () => {
  return http.get('/topic/getall');
};

export const addTopic = (body) => {
  return http.post('/topic/addtopic', body);
};
