export const setSession = (accessToken, id, name) => {
  if (accessToken) {
    // console.log('inside session fn');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticated', 'true');
    // localStorage.setItem('id', id);
    // localStorage.setItem('name', name);
  }
};

export const removeAuth = () => {
  //   localStorage.removeItem('userData')
  // console.log(`removeAuth working `);
  window.localStorage.removeItem('isAuthenticated');
  // window.localStorage.removeItem('id');
  // window.localStorage.removeItem('name');
  window.localStorage.removeItem('accessToken');
  //   localStorage.removeItem('authkey');
};
