import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Obligations2 = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>7A.</span>
        <p>Enter Monthly Payment Amounts For</p>
      </div>
      <div className={classes.description}>
        <span>
          ( exclude things such as garnishments that are already taken out of
          your pay )
        </span>
      </div>
      <div className={classes.input_field}>
        <div className={classes.other_description}>
          <label>
            Past Credit Card Debt
            <span>
              (exclude new monthly charges you pay in full each month)
            </span>
          </label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
          />
        </div>
        <div>
          <label>Student Loans</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
          />
        </div>
        <div>
          <label>Home Equity Line of Credit</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
          />
        </div>
        <div>
          <label>Alimony</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
          />
        </div>
        <div>
          <label>Child Support</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
          />
        </div>

        <div>
          <label>Total</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
          />
        </div>
      </div>
      <div className={classes.text_btn}>
        <button className={classes.btn}>Ok</button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default Obligations2;
