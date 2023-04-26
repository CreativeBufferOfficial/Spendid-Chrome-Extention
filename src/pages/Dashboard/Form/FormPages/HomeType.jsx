import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';

const HomeType = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>4.</span>
        <p>Rent or Own Your Home?</p>
      </div>
      <div className={classes.select_option}>
        <div className={classes.option}>
          <p>A</p>
          <p>Rent</p>
        </div>
        <div className={classes.option}>
          <p>B</p>
          <p>Own</p>
        </div>
      </div>
    </div>
  );
  return content;
};

export default HomeType;
