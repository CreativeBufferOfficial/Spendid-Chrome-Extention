import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const HouseHold = () => {
  const { data, handleChange } = useFormContext();

  const options = [
    { name: 'A', value: '1' },
    { name: 'B', value: '2' },
    { name: 'C', value: '3' },
    { name: 'D', value: '4' },
    { name: 'E', value: '5 or more' },
  ];
  let { household_members } = data.apiReq.demographics;
  console.log(data);
  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>3.</span>
        <p>Number of People in Household</p>
      </div>
      <div className={classes.select_option}>
        {options.map((item, index) => (
          <div key={index} className={classes.option} onClick={handleChange}>
            <p name={'household_members'} value={item.value}>
              {item.name}
            </p>
            <p name={'household_members'} value={item.value}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  return content;
};

export default HouseHold;
