import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import selected from '../../../../assets/form/select.png';
const HouseHold = () => {
  const { page, handleChange, globalSelectedIndex } = useFormContext();

  const options = [
    { name: 'A', value: '1' },
    { name: 'B', value: '2' },
    { name: 'C', value: '3' },
    { name: 'D', value: '4' },
    { name: 'E', value: '5 or more' },
  ];
  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>3.</span>
        <p>Number of People in Household</p>
      </div>
      <div className={classes.select_option}>
        {options.map((item, i) => (
          <div
            key={i}
            className={classes.option}
            onClick={(e) => handleChange(e, i)}
            style={{
              border:
                globalSelectedIndex[page] === i
                  ? '1px solid #31bfaa'
                  : ' 1px solid lightgrey',
            }}
          >
            <p name={'household_members'} value={item.value}>
              {item.name}
            </p>
            <p name={'household_members'} value={item.value}>
              {item.value}
              <img
                className={classes.not_select}
                src={selected}
                alt="selected"
                style={{
                  display: globalSelectedIndex[page] === i ? 'block ' : 'none',
                }}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  return content;
};

export default HouseHold;
