import React from 'react';
import classes from './ResultTitle.module.css';
import { questionIcon } from '../../../utlis/Imports';
const ResultTitle = ({ title }) => {
  return (
    <>
      <div className={classes.text}>
        <p>{title}</p>
        <span>
          <img src={questionIcon} alt="questionIcon" />
        </span>
      </div>
    </>
  );
};

export default ResultTitle;
