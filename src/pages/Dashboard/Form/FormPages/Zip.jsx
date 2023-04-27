import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Zip = () => {
  const { data, handleChange } = useFormContext();

  // const { zip } = data.apiReq.demographics;
  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>1.</span>
        <p>5-digit Home Zip Code</p>
      </div>
      <div className={classes.input_field}>
        <input
          className={classes.input}
          type="number"
          maxLength="5"
          name="zip"
          // value={zip}
          onChange={handleChange}
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

export default Zip;
