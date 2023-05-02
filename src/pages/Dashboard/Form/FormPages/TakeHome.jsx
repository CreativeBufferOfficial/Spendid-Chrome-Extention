import React, { useState } from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import addIcon from '../../../../assets/form/addSource.png';
import selected from '../../../../assets/form/select.png';

const TakeHome = () => {
  const { data, handleChange } = useFormContext();
  // const { net_annual_income } = data.apiReq.demographics;
  const [netIncome, setNetIncome] = useState([{ frequency: '', amount: 0 }]);

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
  };

  const frequencyHandler = (i) => (e) => {
    const selected = e.currentTarget;
    console.log('selected>>>>>>>>', i, selected);
    selected.style.border = '1px solid #31bfaa';
    selected.children[1].children[0].style.display = 'block';

    // console.log('selected>>>>>>', selected);
  };

  console.log(netIncome);
  const sourceChangeHandle = (index) => (e) => {
    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;
    let newArry = [...netIncome];
    console.log('arrayIndex>>>>>', newArry[index]);
    console.log('arrayIndex>>>>>', newArry);
    newArry[index][name] = value;
    setNetIncome(newArry);
  };

  const calculateAmount = netIncome.map((item) => {
    if (item.frequency === 'Weekly') {
      return item.amount * 4;
    } else if (item.frequency === 'Every 2 Weeks') {
      return item.amount * 2;
    } else if (item.frequency === 'Twice per Month') {
      return item.amount * 2;
    } else if (item.frequency === 'Quarterly') {
      return item.amount / 3;
    } else if (item.frequency === 'Semi-Annually') {
      return item.amount / 6;
    } else if (item.frequency === 'Annually') {
      return item.amount / 12;
    } else {
      return item.amount * 1;
    }
  });
  const sumWithInitial = Math.round(
    calculateAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  );

  console.log(calculateAmount);
  console.log(sumWithInitial);

  console.log('netIncome>>>>>>>>>>>>>>', netIncome);
  console.log('data>>>>>>>>>>>>>>', data);

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>9.</span>
        <p>Take-Home Income</p>
      </div>
      {netIncome.map((item, index) => {
        return (
          <div key={index} className={classes.source_feild}>
            <div className={classes.description}>
              <span>
                Source #{index + 1} <br /> Frequency
              </span>
            </div>
            <div className={classes.select_option}>
              {options.map((option, i) => (
                <div
                  key={i}
                  className={classes.option}
                  name={'frequency'}
                  onClick={frequencyHandler(index, i)}
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
                  type="number"
                  maxLength="5"
                  name="amount"
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
          onClick={() => clickHandler({ frequency: '', amount: 0 })}
        />
        <div className={classes.amount_text}>
          <p> Total Monthly Take-Home Income $</p>
          <input
            type="text"
            name="net_annual_income"
            value={sumWithInitial}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.text_btn}>
        <button
          className={
            netIncome[0].frequency.length > 0 && netIncome[0].amount.length > 0
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
