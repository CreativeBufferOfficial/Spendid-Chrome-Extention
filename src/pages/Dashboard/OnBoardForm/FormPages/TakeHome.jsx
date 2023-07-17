import React, { useState, useEffect } from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import { selected, addIcon } from '../../../../utlis/Imports';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  lendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../../action/actions';
import {
  calcSourceIncome,
  calcTotalSourceIncome,
  formatAmountValue,
} from '../../../../utlis/Helper';
const TakeHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const {
    data,
    categoryInputHandler,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
    netIncome,
    setNetIncome,
  } = useFormContext();
  const [selectedIndex, setSelectedIndex] = useState([-1]);

  const options = [
    { name: 'A', value: 'Weekly' },
    { name: 'B', value: 'Every 2 Weeks' },
    { name: 'C', value: 'Twice per Month' },
    { name: 'D', value: 'Monthly' },
    { name: 'E', value: 'Quarterly' },
    { name: 'F', value: 'Semi-Annually' },
    { name: 'G', value: 'Annually' },
  ];
  const clickHandler = (item) => {
    setNetIncome([...netIncome, item]);
    setSelectedIndex([...selectedIndex, -1]);
  };

  const sourceChangeHandle = (index, i) => (e) => {
    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;

    netIncome[index][name] = value;
    setNetIncome(netIncome);

    if (i !== undefined) {
      selectedIndex[index] = i;
      setSelectedIndex(selectedIndex);
    }
    const calcIncomeSource = calcSourceIncome(netIncome);
    const totalSourceIncome = calcTotalSourceIncome(calcIncomeSource);
    categoryInputHandler('net_annual_income', totalSourceIncome);
  };

  const removeSource = (index) => {
    netIncome.splice(index, 1);
    setNetIncome([...netIncome]);
    const calcIncomeSource = calcSourceIncome(netIncome);
    const totalSourceIncome = calcTotalSourceIncome(calcIncomeSource);
    categoryInputHandler('net_annual_income', totalSourceIncome);
  };

  // const sendBody = { ...data.apiReq };
  const formSubmitHandler = () => {
    // const body = JSON.parse(JSON.stringify(sendBody));
    Promise.all([lendingGenerate(lendingPayload, dispatch)]).then((data) => {
      const copyBudget = JSON.parse(JSON.stringify(budgetPayload));
      copyBudget.budget.savings = Math.round(data[0]?.elements?.cash_excess);
      console.log('5.1');
      const copyScore = JSON.parse(JSON.stringify(scorePayload));
      copyScore.budget.savings = Math.round(data[0]?.elements?.cash_excess);

      dispatch(demographicsGenerate(demographicsPayload));
      console.log('9');
      console.log('copyBudgetcopyBudget>>>>>>>>>>>>>>>>>>>>', copyBudget);
      dispatch(budgetsGenerate(copyBudget));
      dispatch(scoresGenerate(copyScore));
    });
    navigate('/result');
  };

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>9.</span>
        <p>Take-Home Income</p>
      </div>
      {netIncome.map((item, index, array) => {
        return (
          <div key={index} className={classes.source_feild}>
            <div className={classes.description}>
              <span>
                Source #{index + 1} <br /> Frequency
              </span>
              {array.length > 1 ? (
                <span
                  onClick={() => removeSource(index)}
                  className={classes.sourceIncome_label}
                >
                  Delete
                </span>
              ) : (
                ''
              )}
            </div>
            <div className={classes.select_option}>
              {options.map((option, i) => (
                <div
                  key={i}
                  className={classes.option}
                  name={'frequency'}
                  value={option.value}
                  onClick={sourceChangeHandle(index, i)}
                  style={{
                    border:
                      selectedIndex[index] === i
                        ? '1px solid #31bfaa'
                        : ' 1px solid lightgrey',
                  }}
                >
                  <p name={'frequency'} value={option.value}>
                    {option.name}
                  </p>
                  <p name={'frequency'} value={option.value}>
                    {option.value}
                    <img
                      className={classes.not_select}
                      src={selected}
                      alt="selected"
                      style={{
                        display: selectedIndex[index] === i ? 'block ' : 'none',
                      }}
                    />
                  </p>
                </div>
              ))}
            </div>

            <div className={classes.input_field}>
              <div>
                <label>Amount</label>
                <input
                  className={classes.input}
                  type="text"
                  maxLength="5"
                  name="amount"
                  value={
                    focused
                      ? item.amount
                      : item.amount.length > 0
                      ? formatAmountValue(item.amount)
                      : ''
                  }
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={sourceChangeHandle(index)}
                  placeholder="Type your amount here"
                />
              </div>
            </div>
          </div>
        );
      })}

      <div className={classes.add_source}>
        <p>Add Income Source</p>
        <img
          src={addIcon}
          alt="add source"
          onClick={() => clickHandler({ frequency: '', amount: '' })}
        />
        <div className={classes.amount_text}>
          <p> Total Monthly Take-Home Income $</p>
          <span name="net_annual_income">
            {data?.apiReq?.demographics?.net_annual_income}
          </span>
        </div>
      </div>
      <div className={classes.text_btn}>
        <button
          onClick={formSubmitHandler}
          className={
            netIncome[0].frequency.length > 0 &&
            netIncome[0].amount.toString().length > 0
              ? classes.btn
              : classes.btn_disable
          }
        >
          Ok
        </button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default TakeHome;
