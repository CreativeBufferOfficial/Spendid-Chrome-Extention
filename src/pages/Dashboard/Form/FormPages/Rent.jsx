import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';

const Rent = () => {
  const { data, handleChange, nextHandler, currentHandler } = useFormContext();

  const { mortgage_and_rent } = data.apiReq.budget;
  const rent_input = mortgage_and_rent.toString().length > 0;

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>5.</span>
        <p>Monthly Rent or Mortgage Payment</p>
      </div>
      <div className={classes.description}>
        <span>
          (include property taxes, homeowners insurance and any HOA fees)
        </span>
      </div>
      <div className={classes.input_field}>
        <input
          className={classes.input}
          type="number"
          maxLength="5"
          name="mortgage_and_rent"
          value={mortgage_and_rent}
          onChange={handleChange}
          placeholder="Type your answer here..."
        />
      </div>
      <div className={classes.text_btn}>
        <button
          className={rent_input ? classes.btn : classes.btn_disable}
          onClick={rent_input ? nextHandler : currentHandler}
        >
          Ok
        </button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default Rent;
