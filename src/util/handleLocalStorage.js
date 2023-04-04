export const setTokenLocalStorage = (token) => {
  console.log({ token });

  localStorage.setItem(
    JSON.stringify(process.env.REACT_APP_IOT_USER_TOKEN),
    token,
  );
};

export const getTokenLocalStorage = () => {
  return localStorage.getItem(
    JSON.stringify(process.env.REACT_APP_IOT_USER_TOKEN),
  );
};

export const deleteTokenLocalStorage = () => {
  localStorage.removeItem(JSON.stringify(process.env.REACT_APP_IOT_USER_TOKEN));
};
