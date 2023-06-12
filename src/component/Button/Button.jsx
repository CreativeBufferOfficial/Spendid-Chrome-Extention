import React from 'react';
import classes from './Result.module.css';

const Button = ({ clearInput, text }) => {
  return (
    <button className={classes.clearInput} type="button" onClick={clearInput}>
      {text}
    </button>
  );
};
export default Button;
