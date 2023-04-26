import React from 'react';
// import logo from '../../assets/img/logo.svg';
// import Greetings from '../../containers/Greetings/Greetings';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/HomePage/Dashboard';
import classes from './Popup.module.css';
import Form from '../Dashboard/Form/Form';
import { FormProvider } from '../../context/FormContext';

const Popup = () => {
  return (
    <div className={classes.App}>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </FormProvider>
    </div>
  );
};

export default Popup;
