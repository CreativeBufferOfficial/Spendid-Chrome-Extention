import React, { useState, useEffect } from 'react';
import classes from './Login.module.css';
import Logo from '../../assets/login/logo.png';
import openEye from '../../assets/login/eye.png';
import closeEye from '../../assets/login/close-eye.png';
import { login } from '../../action/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  //TODO:  Take it form ap response on fail error and isAuthenticated
  // const error = 'error';
  // const isAuthenticated = 'false';

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);
  const [failMessage, setFailMessage] = useState(false);

  useEffect(() => {
    if (error === 'UnAuthorized') {
      setFailMessage(true);
    }
    if (isAuthenticated === true) {
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
    console.log('user>>>', loginEmail, 'pass>>>>', loginPassword);
    setLoginEmail('');
    setLoginPassword('');
  };

  console.log('user >>>>>>>>>>>>>', user);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.header_color}></div>
      <div className={classes.content}>
        <div className={classes.logo_header}>
          <img src={Logo} alt="logo" />
        </div>
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
      </div>
    </div>
  );
};

export default Login;
