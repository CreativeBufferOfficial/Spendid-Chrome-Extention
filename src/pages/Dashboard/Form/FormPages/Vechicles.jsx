import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Vechicles = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>6.</span>
        <p>Total Monthly Payment For All Vehicles</p>
      </div>
      <div className={classes.input_field}>
        <input
          className={classes.input}
          type="number"
          maxLength="5"
          placeholder="Type your answer here..."
        />
      </div>
      <div className={classes.text_btn}>
        <button className={classes.btn}>Ok</button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default Vechicles;
