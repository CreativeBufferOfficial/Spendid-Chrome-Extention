import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import { selected } from '../../../../utlis/Imports';

const Obligations = () => {
  const { page, formDataHandlerChange, globalSelectedIndex } = useFormContext();
  const options = [
    { name: 'A', value: 'Yes' },
    { name: 'B', value: 'No' },
  ];

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>7.</span>
        <p>Any Other Monthly Debt Payments?</p>
      </div>
      <div className={classes.description}>
        <span>
          (exclude things such as garnishments that are already taken out of
          your pay )
        </span>
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
            <p name={'isOtherDept'} value={item.value}>
              {item.name}
            </p>
            <p name={'isOtherDept'} value={item.value}>
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

export default Obligations;
