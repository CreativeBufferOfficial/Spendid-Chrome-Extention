import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const HealthInsurance = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>8.</span>
        <p>Do you pay Health Insurance Premiums "out-of-pocket"?</p>
      </div>
      <div className={classes.description}>
        <span>(from your take-home income)</span>
      </div>
      <div className={classes.select_option}>
        <div className={classes.option}>
          <p>A</p>
          <p>Yes</p>
        </div>
        <div className={classes.option}>
          <p>B</p>
          <p>No</p>
        </div>
      </div>
    </div>
  );

  return content;
};

export default HealthInsurance;
