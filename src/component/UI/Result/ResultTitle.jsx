import React from 'react';
import classes from './ResultTitle.module.css';
import { questionIcon } from '../../../utlis/Imports';
const ResultTitle = ({ title, handleMouseEnter, handleMouseLeave }) => {
  return (
    <>
      <div className={classes.text}>
        <p>{title}</p>
        <span>
          <img
            src={questionIcon}
            alt="questionIcon"
            // className={classes.popup_trigger}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          />
        </span>
      </div>
    </>
  );
};

export default ResultTitle;
