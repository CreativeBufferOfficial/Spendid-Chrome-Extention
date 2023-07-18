import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const HealthInsurance2 = () => {
  const { data, formDataHandlerChange, nextHandler, currentHandler } =
    useFormContext();
  const { health_insurance } = data.apiReq.budget;
  // const health_input = health_insurance.toString().length > 0;
  let health_input;

  if (health_insurance && health_insurance.toString().length > 0) {
    health_input = true;
    localStorage.setItem('Health Insurance', 'Health Insurance');
  } else {
    health_input = false; // or any other value you want to assign when the input is empty
  }

  const handleKeyDown = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter' && health_input) {
      nextHandler();
    }
  };

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>8A.</span>
        <p>Health Insurance Premium amount (paid out-of-pocket)</p>
      </div>
      <div className={classes.input_field}>
        <input
          className={classes.input}
          type="number"
          maxLength="5"
          placeholder="Type your answer here..."
          name="health_insurance"
          // value={health_insurance.toString().replace(/^0+/, '')}
          value={health_insurance}
          onChange={formDataHandlerChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={classes.text_btn}>
        <button
          onClick={health_input ? nextHandler : currentHandler}
          className={health_input ? classes.btn : classes.btn_disable}
        >
          Ok
        </button>
        <p>Press Enter ↵</p>
      </div>
    </div>
  );

  return content;
};

export default HealthInsurance2;
