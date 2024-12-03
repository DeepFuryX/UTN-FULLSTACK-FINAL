export const getToken = () => {
  if (localStorage.getItem('token')) {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
