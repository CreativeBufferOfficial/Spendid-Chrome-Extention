export const setSession = (accessToken) => {
  if (accessToken) {
    console.log('inside session fn');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticated', 'true');
  }
};

export const removeAuth = () => {
  // console.log(`removeAuth working `);
  window.localStorage.removeItem('isAuthenticated');
  window.localStorage.removeItem('accessToken');
};
