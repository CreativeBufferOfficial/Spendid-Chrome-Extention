import React, { useState, useCallback } from 'react';
import classes from './Expense.module.css';
import { edit, close } from '../../../utlis/Imports';
import useFormContext from '../../../hooks/useFormContext';

const Expense = ({
  index,
  title,
  amount1,
  amount2,
  toggle_title,
  gridView,
  isMajorExpensesTab,
  onRemoveCategory,
  // handleKeyDown,
  // bg,
}) => {
  const { transformData, categoryInputHandler } = useFormContext();
  const [showAmount, setShowAmount] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState('');

  // const keyPressed = event.key;

  // // Change the background color based on the key pressed
  // if (keyPressed === 'Enter') {
  //   setBgColor('green');
  // } else if (keyPressed === 'Escape') {
  //   setBgColor('red');
  // } else {
  //   setBgColor('');
  // }
  // };
  const [bgColor, setBgColor] = useState('');

  const handleKeyDown = (event) => {
    setBgColor('#0267e8');
  };

  const filter = transformData.filter((obj) => obj.name === title);
  const showAmountHandler = () => {
    setShowAmount((prev) => !prev);
  };
  const handleClick = () => {
    setSelectedOption('default value');
  };
  const selectformDataHandlerChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const clearAmountInput = () => {
    setAmount(' ');
  };

  const categoryAmountHandler = useCallback(
    (e) => {
      const name = e.target.getAttribute('name');
      let value = e.target.value;
      setAmount(value);
      const frequency = e.target.getAttribute('frequency');
      if (frequency === 'Weekly') {
        value = value * 4;
      } else if (frequency === 'Quarterly') {
        value = value / 3;
      } else if (frequency === 'Semi-Annually') {
        value = value / 6;
      } else if (frequency === 'Annually') {
        value = value / 12;
      } else {
        value = value;
      }

      categoryInputHandler(name, value);
    },
    [categoryInputHandler]
  );

  return (
    <>
      <div className={classes.expenses}>
        <div className={classes.payment_view_field}>
          <div className={classes.title}>
            <p>{title}</p>
            {isMajorExpensesTab ? (
              ''
            ) : (
              <img
                src={close}
                alt="close"
                onClick={() => onRemoveCategory(index)}
              />
            )}
          </div>
          <div
            className={
              gridView ? classes.payment_value_grid : classes.payment_value
            }
          >
            <p style={{ backgroundColor: bgColor }}>
              ${amount ? (amount === ' ' ? amount1 : amount) : amount1}
            </p>
            <p>${amount2}</p>
          </div>
          <div className={classes.field_label}>
            <p onClick={showAmountHandler}>
              <img src={edit} alt="edit" /> Your Amount
            </p>
            <p onClick={showAmountHandler}> Your Peers</p>
          </div>
        </div>
        <div
          className={
            showAmount
              ? classes.Toggle_input_field
              : classes.hide_Toggle_input_field
          }
        >
          <div className={classes.toggle_input_header}>
            <label>{toggle_title}</label>
            <button> Get Advice</button>
            <button
              className={classes.clear_btn}
              type="button"
              onClick={clearAmountInput}
            >
              Clear
            </button>
          </div>
          <div className={classes.input_area}>
            <input
              type="text"
              className={classes.input_field}
              placeholder="Enter a Value"
              name={filter[0].payloadName}
              frequency={selectedOption}
              onChange={categoryAmountHandler}
              value={amount}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={classes.input_area}>
            <div>
              <label>Frequency</label>
              <button type="button" onClick={handleClick}>
                Clear
              </button>
            </div>
            {/* <input type="text" className={classes.input_field} /> */}
            <select
              className={classes.input_field}
              value={selectedOption}
              onChange={selectformDataHandlerChange}
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Quarterly</option>
              <option>Semi-Annually</option>
              <option>Annually</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expense;
