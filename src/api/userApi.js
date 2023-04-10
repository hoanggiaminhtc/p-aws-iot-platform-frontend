import http from '~/util/http';

export const login = (body) => {
  return http.post('/auth/login', body);
};

export const forgetPassword = (email) => {
  return http.post('/auth/resetpassword', { email });
};

export const changePassword = (body) => {
  return http.put('/auth/changepassword', body);
};

export const getProfile = () => {
  return http.get('/user/myprofile');
};

export const updateProfile = (body) => {
  const formDataProfile = new FormData();
  formDataProfile.append('name', body.name);
  formDataProfile.append('avatar', body.fileAvatar);
  return http({
    method: 'put',
    url: '/user/update',
    data: formDataProfile,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const authentication = () => {
  return http.get('/auth/authentication');
};
