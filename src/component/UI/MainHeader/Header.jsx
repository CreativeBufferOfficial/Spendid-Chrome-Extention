import React from 'react';
import classes from './Header.module.css';
import Logo from '../../../assets/login/logo.png';

const Header = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.header_color}></div>
      <div className={classes.content}>
        <div className={classes.logo_header}>
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Header;
