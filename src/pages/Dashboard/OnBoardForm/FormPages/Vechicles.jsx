import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Vechicles = () => {
  const { data, formDataHandlerChange, nextHandler, currentHandler } =
    useFormContext();

  const { vehicle_purchase_and_lease } = data.apiReq.budget;
  // const vehicle_input = vehicle_purchase_and_lease.toString().length > 0;
  let vehicle_input;

  if (
    vehicle_purchase_and_lease &&
    vehicle_purchase_and_lease.toString().length > 0
  ) {
    vehicle_input = true;
    localStorage.setItem('Car Payments', 'Car Payments');
  } else {
    vehicle_input = false; // or any other value you want to assign when the input is empty
  }

  const handleKeyDown = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter' && vehicle_input) {
      nextHandler();
    }
  };

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
          // value={vehicle_purchase_and_lease.toString().replace(/^0+/, '')}
          value={vehicle_purchase_and_lease}
          onChange={formDataHandlerChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={classes.text_btn}>
        <button
          onClick={vehicle_input ? nextHandler : currentHandler}
          className={vehicle_input ? classes.btn : classes.btn_disable}
        >
          Ok
        </button>
        <p>Press Enter ↵</p>
      </div>
    </div>
  );

  return content;
};

export default Vechicles;
