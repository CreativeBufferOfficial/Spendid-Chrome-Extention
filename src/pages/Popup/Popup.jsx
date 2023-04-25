import React from 'react';
// import logo from '../../assets/img/logo.svg';
// import Greetings from '../../containers/Greetings/Greetings';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/HomePage/Dashboard';
import classes from './Popup.module.css';
import Form from '../Dashboard/FormPage/Form';

const Popup = () => {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
};

export default Popup;
