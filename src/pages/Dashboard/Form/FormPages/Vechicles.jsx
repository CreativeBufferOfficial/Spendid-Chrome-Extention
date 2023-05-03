import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Vechicles = () => {
  const { data, handleChange, nextHandler, currentHandler } = useFormContext();

  const { vehicle_purchase_and_lease } = data.apiReq.budget;
  const vehicle_input = vehicle_purchase_and_lease.length > 0;

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>6.</span>
        <p>Total Monthly Payment For All Vehicles</p>
      </div>
      <div className={classes.input_field}>
        <input
          className={classes.input}
          type="number"
          maxLength="5"
          placeholder="Type your answer here..."
          name="vehicle_purchase_and_lease"
          value={vehicle_purchase_and_lease}
          onChange={handleChange}
        />
      </div>
      <div className={classes.text_btn}>
        <button
          onClick={vehicle_input ? nextHandler : currentHandler}
          className={vehicle_input ? classes.btn : classes.btn_disable}
        >
          Ok
        </button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default Vechicles;
