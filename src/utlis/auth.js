export const setSession = (accessToken, name, email) => {
  if (accessToken) {
    console.log('Insidesession');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('isAuthenticated', 'true');
  }
};

export const removeAuth = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
};
