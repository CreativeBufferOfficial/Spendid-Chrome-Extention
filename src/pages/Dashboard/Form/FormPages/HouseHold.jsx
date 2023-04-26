import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const HouseHold = () => {
  const { data, handleChange } = useFormContext();
  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>3.</span>
        <p>Number of People in Household</p>
      </div>
      <div className={classes.select_option}>
        <div className={classes.option} onClick={handleChange}>
          <p>A</p>
          <p>1</p>
        </div>
        <div className={classes.option} onClick={handleChange}>
          <p>B</p>
          <p>2</p>
        </div>
        <div
          className={classes.option}
          onClick={handleChange}
          htmlFor="houseHold"
        >
          <p>C</p>
          <p>3</p>
        </div>
        <div className={classes.option} onClick={handleChange}>
          <p>D</p>
          <p>4</p>
        </div>
        <div className={classes.option} onClick={handleChange}>
          <p>E</p>
          <p>5 or more</p>
        </div>
      </div>
    </div>
  );
  return content;
};

export default HouseHold;
