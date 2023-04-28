import React, { useState } from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Obligations2 = () => {
  const { data, handleChange } = useFormContext();

  const [debt, setDebt] = useState({
    pastCreditCardDebt: '',
    studentLoans: '',
    homeEquityLineCredit: '',
    Alimony: '',
    childSupport: '',
    otherDebt: '',
  });

  const deptHandler = (e) => {
    const { name, value } = e.target;

    setDebt((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const values = Object.values(debt);
  // console.log('values', values);
  const totalDeptvalue = values.reduce((accumulator, value) => {
    return +accumulator + +value;
  }, 0);
  console.log('dept>>>>>', debt);
  console.log('totalDeptvalue>>>>>', totalDeptvalue);

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
            name="pastCreditCardDebt"
            placeholder="$ 0"
            value={debt.pastCreditCardDebt}
            onChange={deptHandler}
          />
        </div>
        <div>
          <label>Student Loans</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
            name="studentLoans"
            value={debt.studentLoans}
            onChange={deptHandler}
          />
        </div>
        <div>
          <label>Home Equity Line of Credit</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
            name="homeEquityLineCredit"
            value={debt.homeEquityLineCredit}
            onChange={deptHandler}
          />
        </div>
        <div>
          <label>Alimony</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
            name="Alimony"
            value={debt.Alimony}
            onChange={deptHandler}
          />
        </div>

        <div>
          <label>Child Support</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
            name="childSupport"
            value={debt.childSupport}
            onChange={deptHandler}
          />
        </div>

        <div>
          <label>Other Debt Payments</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
            name="otherDebt"
            value={debt.otherDebt}
            onChange={deptHandler}
          />
        </div>

        <div>
          <label>Total</label>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="$ 0"
            name="other_debt_payments"
            value={totalDeptvalue}
            on
            // onChange={handleChange}
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
