import React from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import FormHeader from '../../../component/UI/Form/FormHeader';
import classes from './Form.module.css';
import addIcon from '../../../assets/form/addSource.png';
const Form = () => {
  return (
    <>
      <Header />
      <FormHeader />

      {/* //TODO: Q-1  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>1.</span>
          <p>5-digit Home Zip Code</p>
        </div>
        <div className={classes.input_field}>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="Type your answer here..."
          />
        </div>
        <div className={classes.text_btn}>
          <button className={classes.btn}>Ok</button>
          <p>Press Enter </p>
        </div>
      </div>
      */}

      {/* //TODO: Q-2  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>2.</span>
          <p>Your Age</p>
        </div>
        <div className={classes.age_description}>
          <span>(Must be 18 or over)</span>
        </div>
        <div className={classes.input_field}>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="Type your answer here..."
          />
        </div>
        <div className={classes.text_btn}>
          <button className={classes.btn}>Ok</button>
          <p>Press Enter </p>
        </div>
      </div> */}

      {/* //TODO: Q-3  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>3.</span>
          <p>Number of People in Household</p>
        </div>
        <div className={classes.select_option}>
          <div className={classes.option}>
            <p>A</p>
            <p>1</p>
          </div>
          <div className={classes.option}>
            <p>B</p>
            <p>2</p>
          </div>
          <div className={classes.option}>
            <p>C</p>
            <p>3</p>
          </div>
          <div className={classes.option}>
            <p>D</p>
            <p>4</p>
          </div>
          <div className={classes.option}>
            <p>E</p>
            <p>5 or more</p>
          </div>
        </div>
      </div> */}

      {/* //TODO: Q-4  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>4.</span>
          <p>Rent or Own Your Home?</p>
        </div>
        <div className={classes.select_option}>
          <div className={classes.option}>
            <p>A</p>
            <p>Rent</p>
          </div>
          <div className={classes.option}>
            <p>B</p>
            <p>Own</p>
          </div>
        </div>
      </div> */}

      {/* //TODO: Q-5  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>5.</span>
          <p>Monthly Rent or Mortgage Payment</p>
        </div>
        <div className={classes.description}>
          <span>
            (include property taxes, homeowners insurance and any HOA fees)
          </span>
        </div>
        <div className={classes.input_field}>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="Type your answer here..."
          />
        </div>
        <div className={classes.text_btn}>
          <button className={classes.btn}>Ok</button>
          <p>Press Enter </p>
        </div>
      </div> */}

      {/* //TODO: Q-6  */}
      {/* <div className={classes.questions}>
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
          />
        </div>
        <div className={classes.text_btn}>
          <button className={classes.btn}>Ok</button>
          <p>Press Enter </p>
        </div>
      </div> */}

      {/* //TODO: Q-7  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>7.</span>
          <p>Any Other Monthly Debt Payments?</p>
        </div>
        <div className={classes.description}>
          <span>
            (exclude things such as garnishments that are already taken out of
            your pay )
          </span>
        </div>
        <div className={classes.select_option}>
          <div className={classes.option}>
            <p>A</p>
            <p>Yes</p>
          </div>
          <div className={classes.option}>
            <p>B</p>
            <p>No</p>
          </div>
        </div>
      </div> */}

      {/* //TODO: Q-7A  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>7A.</span>
          <p>Enter Monthly Payment Amounts For</p>
        </div>
        <div className={classes.description}>
          <span>
            ( exclude things such as garnishments that are already taken out of
            your pay )
          </span>
        </div>
        <div className={classes.input_field}>
          <div className={classes.other_description}>
            <label>
              Past Credit Card Debt
              <span>
                (exclude new monthly charges you pay in full each month)
              </span>
            </label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="$ 0"
            />
          </div>
          <div>
            <label>Student Loans</label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="$ 0"
            />
          </div>
          <div>
            <label>Home Equity Line of Credit</label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="$ 0"
            />
          </div>
          <div>
            <label>Alimony</label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="$ 0"
            />
          </div>
          <div>
            <label>Child Support</label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="$ 0"
            />
          </div>
         <div className={classes.input_field}>
          <input
            className={classes.input}
            type="number"
            maxLength="5"
            placeholder="Type your answer here..."
          />
        </div>
          <div>
            <label>Total</label>
            <input
              className={classes.input}
              type="number"
              maxLength="5"
              placeholder="$ 0"
            />
          </div>
        </div>
        <div className={classes.text_btn}>
          <button className={classes.btn}>Ok</button>
          <p>Press Enter </p>
        </div>
      </div> */}

      {/* //TODO: Q-8  */}
      {/* <div className={classes.questions}>
        <div className={classes.question}>
          <span>8.</span>
          <p>Do you pay Health Insurance Premiums "out-of-pocket"?</p>
        </div>
        <div className={classes.description}>
          <span>(from your take-home income)</span>
        </div>
        <div className={classes.select_option}>
          <div className={classes.option}>
            <p>A</p>
            <p>Yes</p>
          </div>
          <div className={classes.option}>
            <p>B</p>
            <p>No</p>
          </div>
        </div>
      </div> */}

      {/* //TODO: Q-8A  */}
      {/* <div className={classes.questions}>
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
          />
        </div>
        <div className={classes.text_btn}>
          <button className={classes.btn}>Ok</button>
          <p>Press Enter </p>
        </div>
      </div> */}

      {/* //TODO: Q-9  */}
      <div className={classes.questions}>
        <div className={classes.question}>
          <span>9.</span>
          <p>Take-Home Income</p>
        </div>
        <div className="source1">
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
        <div className={classes.add_source}>
          <p>Add Income Source</p>
          <img src={addIcon} alt="add source" />
          <p>Total Monthly Take-Home Income $0</p>
        </div>
      </div>
      <div className={classes.text_btn}>
        <button className={classes.btn}>Ok</button>
        <p>Press Enter </p>
      </div>
      <div className={classes.button_group}>
        <button className={classes.prev}>{'<'}</button>
        <button className={classes.next}>{'>'}</button>
      </div>
    </>
  );
};

export default Form;
