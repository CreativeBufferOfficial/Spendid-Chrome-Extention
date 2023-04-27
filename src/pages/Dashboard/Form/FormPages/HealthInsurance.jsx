import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const HealthInsurance = () => {
  const { page, setPage, data, handleChange } = useFormContext();

  const options = [
    { name: 'A', value: 'Yes' },
    { name: 'B', value: 'No' },
  ];

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>8.</span>
        <p>Do you pay Health Insurance Premiums "out-of-pocket"?</p>
      </div>
      <div className={classes.description}>
        <span>(from your take-home income)</span>
      </div>
      <div className={classes.select_option}>
        {options.map((item, index) => (
          <div key={index} className={classes.option}>
            <p value={item.value}>{item.name}</p>
            <p value={item.value}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return content;
};

export default HealthInsurance;
