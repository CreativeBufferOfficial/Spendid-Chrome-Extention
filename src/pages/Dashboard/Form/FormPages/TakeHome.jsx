import React, { useState } from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import addIcon from '../../../../assets/form/addSource.png';

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
  console.log(netIncome);

  // const Income = [
  //   { frequency: 'weekly', amount: 10 },
  //   { frequency: 'monthly', amount: 20 },
  // ];

  // const arr = Income.map((item) => {
  //   if (item.frequency === 'weekly') {
  //     return item.amount * 4;
  //   } else {
  //     return item.amount * 1;
  //   }
  // });
  // const sumWithInitial = arr.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   0
  // );

  // console.log(arr);
  // console.log(sumWithInitial);

  console.log('netIncome>>>>>>>>>>>>>>', netIncome);

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>9.</span>
        <p>Take-Home Income</p>
      </div>
      {netIncome.map((item, index) => {
        index += 1;
        return (
          <div key={index} className={classes.source_feild}>
            <div className={classes.description}>
              <span>
                Source #{index} <br /> Frequency
              </span>
            </div>
            <div className={classes.select_option}>
              {options.map((option, i) => (
                <div
                  key={i}
                  className={classes.option}
                  onClick={() =>
                    setNetIncome(netIncome.frequency === option.value)
                  }
                >
                  <p name={'frequency'} value={option.value}>
                    {option.name}
                  </p>
                  <p name={'frequency'} value={option.value}>
                    {option.value}
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
                  onChange={() => setNetIncome(netIncome.amount)}
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
        <p>Total Monthly Take-Home Income $0</p>
      </div>
      <div className={classes.text_btn}>
        <button className={classes.btn}>Ok</button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default TakeHome;
