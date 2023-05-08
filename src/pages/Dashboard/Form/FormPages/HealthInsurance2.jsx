import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const HealthInsurance2 = () => {
  const { data, handleChange, nextHandler, currentHandler } = useFormContext();
  const { health_insurance } = data.apiReq.budget;
  const health_input = health_insurance.toString().length > 0;
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
          value={health_insurance.toString().replace(/^0+/, '')}
          onChange={handleChange}
        />
      </div>
      <div className={classes.text_btn}>
        <button
          onClick={health_input ? nextHandler : currentHandler}
          className={health_input ? classes.btn : classes.btn_disable}
        >
          Ok
        </button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default HealthInsurance2;
