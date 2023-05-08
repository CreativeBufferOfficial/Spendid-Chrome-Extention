import React from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import GaugeChart from './GaugeChart/GaugeChart';
import ResultTitle from '../../../component/UI/Result/ResultTitle';
import classes from './Result.module.css';
import { useSelector } from 'react-redux';
const Result = () => {
  const { scores } = useSelector((state) => state.score);
  const breakeven = scores && scores?.breakeven;
  // console.log('scores', scores);
  // console.log('breakeven', breakeven);

  let score;
  if (breakeven > 100) {
    score = 100;
  } else if (breakeven < 0) {
    score = 0;
  } else {
    score = breakeven;
  }
  return (
    <>
      <Header />
      <div className={classes.content}>
        <div className={classes.headtitle}>
          <div className={classes.designBox}></div>
          <p>Your result</p>
        </div>
        <ResultTitle title="SPENDiD Budget Health Score" />
        <GaugeChart score={score && +score} />
        <ResultTitle title="Monthly Predicted Saving Ability" />
      </div>
    </>
  );
};

export default Result;
