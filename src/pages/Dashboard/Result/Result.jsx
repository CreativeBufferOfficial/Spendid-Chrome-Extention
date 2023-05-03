import React from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import GaugeChart from './GaugeChart/GaugeChart';
import ResultTitle from '../../../component/UI/Result/ResultTitle';
import classes from './Result.module.css';

const Result = () => {
  return (
    <>
      <Header />
      <div className={classes.content}>
        <div className={classes.headtitle}>
          <div className={classes.designBox}></div>
          <p>Your result</p>
        </div>
        <ResultTitle title="SPENDiD Budget Health Score" />
        <GaugeChart />
        <ResultTitle title="Monthly Predicted Saving Ability" />
      </div>
    </>
  );
};

export default Result;
