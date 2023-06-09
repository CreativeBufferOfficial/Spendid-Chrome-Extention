import React, { useState, useEffect } from 'react';
import classes from './Login.module.css';
import { login } from '../../action/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, openEye, closeEye } from '../../utlis/Imports';
import { setSession } from '../../utlis/auth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, user } = useSelector((state) => state.user);

  const token = user?.access_token;
  setSession(token);
  //TODO:  Take it form api response on fail error and isAuthenticated
  // const error = 'error';
  // const isAuthenticated = 'false';

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (error === 'UnAuthorized') {
      setFailMessage(true);
    }
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate, error, isAuthenticated]);

  const Eye = () => {
    if (loginPassword.length > 0) {
      seteye((prev) => !prev);
      settype((prev) => !prev);
    }
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    setLoginEmail('');
    setLoginPassword('');
  };

  return (
    <>
      <Header />
      <form onSubmit={loginSubmitHandler} className={classes.login_form}>
        <div className={classes.form_title}>User Login</div>
        {failMessage ? (
          <div className={classes.fail_message}>
            These credentials do not match our records.
          </div>
        ) : (
          ''
        )}

        <div>
          <div className={classes.user_input_wrp}>
            <br />
            <input
              type="text"
              className={classes.inputText}
              required
              autoComplete="on"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <span className={classes.floating_label}>User Name</span>
          </div>
          <div className={classes.user_input_wrp}>
            <br />
            <input
              type={type ? 'text' : 'password'}
              className={classes.inputText}
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <span className={classes.floating_label}>Password</span>

            <img
              onClick={Eye}
              className={eye ? classes.openEye : classes.closeEye}
              src={eye ? openEye : closeEye}
              alt="view"
            />
          </div>
        </div>
        <button className={classes.login_btn} type="submit">
          Login
        </button>
        <p>Forgot your Password ?</p>
      </form>
    </>
  );
};

export default Login;
