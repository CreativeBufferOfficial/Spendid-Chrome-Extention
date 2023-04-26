import React from 'react';
import useFormContext from '../../../../hooks/useFormContext';
import classes from '../Form.module.css';
import addIcon from '../../../../assets/form/addSource.png';

const TakeHome = () => {
  const { data, handleChange } = useFormContext();

  const content = (
    <div className={classes.questions}>
      <div className={classes.question}>
        <span>9.</span>
        <p>Take-Home Income</p>
      </div>
      <div className={classes.source_feild}>
        <div className={classes.description}>
          <span>
            Source #1 <br /> Frequency
          </span>
        </div>
        <div className={classes.select_option}>
          <div className={classes.option}>
            <p>A</p>
            <p>Weekly</p>
          </div>
          <div className={classes.option}>
            <p>B</p>
            <p>Every 2 Weeks</p>
          </div>
          <div className={classes.option}>
            <p>C</p>
            <p>Twice per Month</p>
          </div>
          <div className={classes.option}>
            <p>D</p>
            <p>Monthly</p>
          </div>
          <div className={classes.option}>
            <p>E</p>
            <p>Quarterly</p>
          </div>
          <div className={classes.option}>
            <p>E</p>
            <p>Semi-Annually</p>
          </div>
          <div className={classes.option}>
            <p>E</p>
            <p>Annually</p>
          </div>
        </div>

        <div className={classes.input_field}>
          <div>
            <label>Amount</label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="Type your amount here"
            />
          </div>
        </div>
      </div>

      <div className={classes.source_feild}>
        <div className={classes.description}>
          <span>
            Source #2 <br /> Frequency
          </span>
        </div>
        <div className={classes.select_option}>
          <div className={classes.option}>
            <p>A</p>
            <p>Weekly</p>
          </div>
          <div className={classes.option}>
            <p>B</p>
            <p>Every 2 Weeks</p>
          </div>
          <div className={classes.option}>
            <p>C</p>
            <p>Twice per Month</p>
          </div>
          <div className={classes.option}>
            <p>D</p>
            <p>Monthly</p>
          </div>
          <div className={classes.option}>
            <p>E</p>
            <p>Quarterly</p>
          </div>
          <div className={classes.option}>
            <p>E</p>
            <p>Semi-Annually</p>
          </div>
          <div className={classes.option}>
            <p>E</p>
            <p>Annually</p>
          </div>
        </div>

        <div className={classes.input_field}>
          <div>
            <label>Amount</label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="Type your amount here"
            />
          </div>
        </div>
      </div>
      <div className={classes.add_source}>
        <p>Add Income Source</p>
        <img src={addIcon} alt="add source" />
        <p>Total Monthly Take-Home Income $0</p>
      </div>
      <div className={classes.text_btn}>
        <button className={classes.btn}>Ok</button>
        <p>Press Enter </p>
      </div>
    </div>
  );

  return content;
};

export default TakeHome;
