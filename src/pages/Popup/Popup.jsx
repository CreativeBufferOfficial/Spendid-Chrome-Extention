import React from 'react';
// import logo from '../../assets/img/logo.svg';
// import Greetings from '../../containers/Greetings/Greetings';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
// import Dashboard from '../Dashboard/HomePage/Dashboard';
import classes from './Popup.module.css';
import Form from '../Dashboard/OnBoardForm/Form';
import Home from '../Dashboard/Home';
import { FormProvider } from '../../context/FormContext';
// import Result from '../Dashboard/Result/Result';
import AllResult from '../Dashboard/BudgetReport/AllResults';

const Popup = () => {
  return (
    <div className={classes.App}>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Home />} />
          <Route path="/form" element={<Form />} />
          {/* <Route path="/dashboard" element={<AllResult />} /> */}
          <Route path="/result" element={<AllResult />} />
        </Routes>
      </FormProvider>
    </div>
  );
};

export default Popup;
