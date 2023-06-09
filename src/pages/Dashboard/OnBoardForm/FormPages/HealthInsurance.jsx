import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import { selected } from '../../../../utlis/Imports';

const HealthInsurance = () => {
  const { page, formDataHandlerChange, globalSelectedIndex } = useFormContext();

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
        {options.map((item, i) => (
          <div
            key={i}
            className={classes.option}
            onClick={(e) => formDataHandlerChange(e, i)}
            style={{
              border:
                globalSelectedIndex[page] === i
                  ? '1px solid #31bfaa'
                  : ' 1px solid lightgrey',
            }}
          >
            <p name={'isHealthInsured'} value={item.value}>
              {item.name}
            </p>
            <p name={'isHealthInsured'} value={item.value}>
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

export default HealthInsurance;
