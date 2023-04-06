export const setTokenLocalStorage = (token) => {
  localStorage.setItem(process.env.REACT_APP_IOT_USER_TOKEN, token);
};

export const getTokenLocalStorage = () => {
  return localStorage.getItem(process.env.REACT_APP_IOT_USER_TOKEN);
};

export const deleteTokenLocalStorage = () => {
  localStorage.removeItem(process.env.REACT_APP_IOT_USER_TOKEN);
};
