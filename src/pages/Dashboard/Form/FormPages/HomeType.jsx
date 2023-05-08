import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import selected from '../../../../assets/form/select.png';

const HomeType = () => {
  const { page, handleChange, globalSelectedIndex } = useFormContext();

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
        {options.map((item, i) => (
          <div
            className={classes.option}
            key={i}
            onClick={(e) => handleChange(e, i)}
            style={{
              border:
                globalSelectedIndex[page] === i
                  ? '1px solid #31bfaa'
                  : ' 1px solid lightgrey',
            }}
          >
            <p name={'is_homeowner'} value={item.value}>
              {item.name}
            </p>
            <p name={'is_homeowner'} value={item.value}>
              {item.text}
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

export default HomeType;
