export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticated', 'true');
  }
};

export const removeAuth = () => {
  window.localStorage.removeItem('isAuthenticated');
  window.localStorage.removeItem('accessToken');
};
