import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';

const HomeType = () => {
  const { data, handleChange } = useFormContext();
  const { is_homeowner } = data.apiReq.demographics;

  const options = [
    { name: 'A', value: false, text: 'Rent' },
    { name: 'B', value: true, text: 'Own' },
  ];

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>4.</span>
        <p>Rent or Own Your Home?</p>
      </div>
      <div className={classes.select_option}>
        {options.map((item, index) => (
          <div className={classes.option} key={index} onClick={handleChange}>
            <p name={'is_homeowner'} value={item.value}>
              {item.name}
            </p>
            <p name={'is_homeowner'} value={item.value}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  return content;
};

export default HomeType;
