import React, { useState, useEffect } from 'react';
import classes from './ResultTabsFormViews.module.css';
import useFormContext from '../../../../../hooks/useFormContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  LendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../../../action/actions';
const ProfileTab = () => {
  const dispatch = useDispatch();
  const {
    data,
    updateState,
    handleChange,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
    netIncome,
    setNetIncome,
  } = useFormContext();
  const { zip, age, household_members, is_homeowner, net_annual_income } =
    data.apiReq.demographics;
  // const [netIncome, setNetIncome] = useState([{ frequency: '', amount: 0 }]);

  const [value, setValue] = useState(household_members);
  const [houseHold, setHouseHold] = useState(is_homeowner);
  const updateLabel = (event) => {
    setValue(event.target.value);
    // handleChange(event, value)
  };

  const apiHandler = () => {
    // console.log("scorePayload api handlder >>", scorePayload)
    dispatch(LendingGenerate(lendingPayload));
    dispatch(demographicsGenerate(demographicsPayload));
    dispatch(budgetsGenerate(budgetPayload));
    // dispatch(scoresGenerate(scorePayload));
  };

  useEffect(() => {
    apiHandler();
  }, []);

  const sourceChangeHandle = (index, i) => (e) => {
    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;

    console.log('name', name);
    console.log('value', value);

    netIncome[index][name] = value;
    setNetIncome(netIncome);

    const calculateAmount = netIncome.map((item) => {
      if (item.frequency === 'Weekly') {
        return item.amount * 4;
      } else if (item.frequency === 'Quarterly') {
        return item.amount / 3;
      } else if (item.frequency === 'Semi-Annually') {
        return item.amount / 6;
      } else if (item.frequency === 'Annually') {
        return item.amount / 12;
      } else {
        return item.amount * 1;
      }
    });

    console.log('calculateAmount', calculateAmount);
    const sumWithInitial = Math.round(
      calculateAmount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
    updateState('net_annual_income', sumWithInitial);
  };
  const clickHandler = (item) => {
    setNetIncome([...netIncome, item]);
  };
  console.log('is_homeowner>>>>>>>>>>>>', is_homeowner);

  return (
    <>
      <div>
        <div className={classes.input_area}>
          <label>5-Digit Zip Code</label>
          <input
            type="number"
            name="zip"
            value={zip.toString().replace(/^0+/, '')}
            onChange={handleChange}
            className={classes.input_field}
          />
        </div>
        <div className={classes.input_area}>
          <label>City</label>
          <input type="text" readOnly className={classes.input_field} />
        </div>
        <div className={classes.input_area}>
          <label>State</label>
          <input type="text" readOnly className={classes.input_field} />
        </div>
        <div className={classes.input_area}>
          <label>Age</label>
          <input
            type="text"
            name="age"
            value={age.toString().replace(/^0+/, '')}
            onChange={handleChange}
            className={classes.input_field}
          />
        </div>

        <div className={classes.range_container}>
          <label># in Household</label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            name="household_members"
            onClick={handleChange}
            value={value}
            onChange={updateLabel}
          />
          <div className={classes.range_labels}>
            {[1, 2, 3, 4, 5].map((label) => (
              <span
                key={label}
                className={`${classes.range_label} ${
                  label === parseInt(value) ? classes.selected : ''
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className={classes.input_area}>
          <label>Housing Type</label>
          <div className={classes.radio_group}>
            <div className={classes.radio_input}>
              <input
                type="radio"
                name="is_homeowner"
                // value={is_homeowner === false ? 'false' : 'true'}
                value="false"
                checked={is_homeowner ? '' : 'checked'}
                onChange={handleChange}
                className={classes.input_field}
              />
              <label>Renter</label>
            </div>
            <div className={classes.radio_input}>
              <input
                type="radio"
                name="is_homeowner"
                value="true"
                checked={is_homeowner ? 'checked' : ''}
                onChange={handleChange}
                className={classes.input_field}
              />
              <label>Owner</label>
            </div>
          </div>
        </div>

        {netIncome.map((item, index) => {
          return (
            <div key={index}>
              <div className={classes.input_area}>
                <label>Net Take Home Pay - Source {index + 1}</label>
                <input
                  type="text"
                  className={classes.input_field}
                  name="amount"
                  value={item.amount}
                  onChange={sourceChangeHandle(index)}
                  placeholder="Enter a value"
                />
              </div>
              <div className={classes.input_area}>
                <label>Frequency</label>

                <select
                  name="frequency"
                  value={item.frequency}
                  onChange={sourceChangeHandle(index)}
                  className={classes.input_field}
                >
                  <option name="frequency" value="Monthly">
                    Monthly
                  </option>
                  <option name="frequency" value="Weekly">
                    Weekly
                  </option>
                  <option name="frequency" value="Quarterly">
                    Quarterly
                  </option>
                  <option name="frequency" value="Semi-Annually">
                    Semi-Annually
                  </option>
                  <option name="frequency" value="Annually">
                    Annually
                  </option>
                </select>
              </div>
            </div>
          );
        })}

        <div className={classes.net_source}>
          <button
            className={classes.addSource_btn}
            type="button"
            onClick={() => clickHandler({ frequency: '', amount: 0 })}
          >
            + Add Income Source
          </button>
        </div>
        <div className={classes.amount_text}>
          <p>
            Monthly amount to work with = $
            {data?.apiReq?.demographics?.net_annual_income
              ? data?.apiReq?.demographics?.net_annual_income
              : 0}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
