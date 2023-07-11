import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';

const Age = () => {
  const { data, formDataHandlerChange, nextHandler, currentHandler } =
    useFormContext();
  const { age } = data.apiReq.demographics;
  // const age_input = age.toString().length > 1 && age >= 18;

  let age_input;

  if (age && age.toString().length > 1 && age >= 18) {
    age_input = true;
  } else {
    age_input = false; // or any other value you want to assign when the input is empty
  }

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>2.</span>
        <p>Your Age</p>
      </div>
      <div className={classes.description}>
        <span>(Must be 18 or over)</span>
      </div>
      <div className={classes.input_field}>
        <input
          className={classes.input}
          type="number"
          maxLength="3"
          name="age"
          value={age.toString().replace(/^0+/, '')}
          // value={age}
          onChange={formDataHandlerChange}
          placeholder="Type your answer here..."
        />
      </div>
      <div className={classes.text_btn}>
        <button
          onClick={age_input ? nextHandler : currentHandler}
          className={age_input ? classes.btn : classes.btn_disable}
        >
          Ok
        </button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default Age;
