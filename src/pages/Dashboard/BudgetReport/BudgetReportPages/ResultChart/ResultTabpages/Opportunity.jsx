import React from 'react';
import classes from './ResultChartAm4.module.css';
import { BarChart, ResultTitle } from '../../../../../../utlis/Imports';
const Opportunity = ({ id }) => {
  return (
    <>
      <div className={classes.content}>
        <div className={classes.headtitle}>
          <div className={classes.designBox}></div>
          <p>Your Opportunities</p>
        </div>
        <ResultTitle title="Focus Areas" />
        <BarChart id={id} />
      </div>
    </>
  );
};

export default Opportunity;
