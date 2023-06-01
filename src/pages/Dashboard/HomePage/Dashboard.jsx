import React from 'react';
import { Header } from '../../../utlis/Imports';
import classes from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();

  const startFormHandler = () => {
    navigate('/form');
  };

  return (
    <>
      <Header />
      <div className={classes.main_content}>
        <div>
          <p>Onboarding interview</p>
          <button onClick={startFormHandler} className={classes.start}>
            Start
          </button>
        </div>
        <div>
          <p>
            To Bypass the Onboarding Interview and go directly to the App, click
            here
          </p>
          <button className={classes.byPass}> ByPass</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
