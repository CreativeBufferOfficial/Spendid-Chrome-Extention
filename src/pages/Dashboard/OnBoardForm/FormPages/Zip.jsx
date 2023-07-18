import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
const Zip = () => {
  const { data, formDataHandlerChange, nextHandler, currentHandler } =
    useFormContext();

  const { zip } = data.apiReq.demographics;
  const zip_input = zip.toString().length > 4;

  const handleKeyDown = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter' && zip_input) {
      nextHandler();
    }
  };

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>1.</span>
        <p>5-digit Home Zip Code</p>
      </div>
      <div className={classes.input_field}>
        <input
          className={classes.input}
          type="number"
          name="zip"
          value={zip.toString().replace(/^0+/, '').slice(0, 5)}
          onChange={formDataHandlerChange}
          placeholder="Type your answer here..."
          pattern="\d{1,2}"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={classes.text_btn}>
        <button
          className={zip_input ? classes.btn : classes.btn_disable}
          onClick={zip_input ? nextHandler : currentHandler}
        >
          Ok
        </button>
        <p>Press Enter ↵</p>
      </div>
    </div>
  );

  return content;
};

export default Zip;
