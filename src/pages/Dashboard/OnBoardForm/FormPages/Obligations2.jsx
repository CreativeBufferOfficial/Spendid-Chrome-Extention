import React, { useEffect, useState } from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Obligations2 = () => {
  const { data, nextHandler, categoryInputHandler } = useFormContext();

  // const [debt, setDebt] = useState({
  //   pastCreditCardDebt: '',
  //   studentLoans: '',
  //   homeEquityLineCredit: '',
  //   Alimony: '',
  //   childSupport: '',
  //   otherDebt: '',
  // });

  const [debt, setDebt] = useState(() => {
    const storedDebt = localStorage.getItem('debt');
    return storedDebt
      ? JSON.parse(storedDebt)
      : {
          pastCreditCardDebt: '',
          studentLoans: '',
          homeEquityLineCredit: '',
          Alimony: '',
          childSupport: '',
          otherDebt: '',
        };
  });

  const deptHandler = (e) => {
    const { name, value } = e.target;
    debt[name] = value;
    setDebt(debt);
    localStorage.setItem('debt', JSON.stringify(debt));
    const values = Object.values(debt);
    const totalDeptvalue = values.reduce((accumulator, value) => {
      return +accumulator + +value;
    }, 0);
    localStorage.setItem(
      'Other Debt Payments & Obligations',
      'Other Debt Payments & Obligations'
    );

    categoryInputHandler('other_debt_payments', totalDeptvalue);
  };

  const handleKeyDown = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      nextHandler();
    }
  };

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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <label> Total </label>
          <p>$ {data?.apiReq?.budget?.other_debt_payments}</p>
        </div>
      </div>
      <div className={classes.text_btn}>
        <button onClick={nextHandler} className={classes.btn}>
          Ok
        </button>
        <p>Press Enter ↵</p>
      </div>
    </div>
  );

  return content;
};

export default Obligations2;
