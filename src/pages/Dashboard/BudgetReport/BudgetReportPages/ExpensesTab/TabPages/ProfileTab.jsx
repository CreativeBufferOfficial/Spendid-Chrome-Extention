import React, { useEffect, useState } from 'react';
import classes from '../TabViews/HomeTabsViews.module.css';
import useFormContext from '../../../../../../hooks/useFormContext';
import {
  calcSourceIncome,
  calcTotalSourceIncome,
  formatAmountValue,
} from '../../../../../../utlis/Helper';
import Pin from '../../../../../../utlis/Pin.json';
import { useSelector } from 'react-redux';

const ProfileTab = () => {
  const { lendings } = useSelector((state) => state.lending);
  const [savingsSet, setSavingsSet] = useState(false);
  // const [pinCode, setPinCode] = useState({ city: '', state: '' });
  // console.log('PIN', Pin);

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const {
    data,
    categoryInputHandler,
    formDataHandlerChange,
    netIncome,
    setNetIncome,
    value,
    setValue,
    // location,
  } = useFormContext();
  const { zip, age, household_members, is_homeowner, net_annual_income } =
    data.apiReq.demographics;

  const updateLabel = (event) => {
    setValue(event.target.value);
  };
  const pinAddress = Pin.find(({ TEST }) => TEST === zip);
  console.log('pinAddress', pinAddress);

  const sourceChangeHandle = (index, i) => (e) => {
    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;
    netIncome[index][name] = value;
    setNetIncome(netIncome);
    const calcIncomeSource = calcSourceIncome(netIncome);
    const totalSourceIncome = calcTotalSourceIncome(calcIncomeSource);
    categoryInputHandler('net_annual_income', totalSourceIncome);
  };
  const clickHandler = (item) => {
    setNetIncome([...netIncome, item]);
  };

  const removeSource = (index) => {
    netIncome.splice(index, 1);
    setNetIncome([...netIncome]);
    const calcIncomeSource = calcSourceIncome(netIncome);
    const totalSourceIncome = calcTotalSourceIncome(calcIncomeSource);
    categoryInputHandler('net_annual_income', totalSourceIncome);
  };

  useEffect(() => {
    if (lendings && lendings.elements && !savingsSet) {
      const savings = Math.round(lendings.elements.cash_excess / 12);
      categoryInputHandler('savings', savings);
      setSavingsSet(true);
    }
  }, [lendings, categoryInputHandler, savingsSet]);

  return (
    <>
      <div>
        <div className={classes.input_area}>
          <label>5-Digit Zip Code</label>
          <input
            type="number"
            name="zip"
            value={zip.toString().replace(/^0+/, '')}
            onWheel={(e) => e.target.blur()}
            onChange={formDataHandlerChange}
            className={classes.input_field}
          />
        </div>
        <div className={classes.input_area}>
          <label>City</label>
          <input
            type="text"
            readOnly
            value={pinAddress ? pinAddress.City : ''}
            className={classes.input_field}
            style={{ backgroundColor: '#E9ECEF' }}
          />
        </div>
        <div className={classes.input_area}>
          <label>State</label>
          <input
            type="text"
            value={pinAddress ? pinAddress.State : ''}
            readOnly
            className={classes.input_field}
            style={{ backgroundColor: '#E9ECEF' }}
          />
        </div>
        <div className={classes.input_area}>
          <label>Age</label>
          <input
            type="text"
            name="age"
            value={age.toString().replace(/^0+/, '')}
            onChange={formDataHandlerChange}
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
            onClick={formDataHandlerChange}
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
                value="false"
                checked={is_homeowner ? '' : 'checked'}
                onChange={formDataHandlerChange}
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
                onChange={formDataHandlerChange}
                className={classes.input_field}
              />
              <label>Owner</label>
            </div>
          </div>
        </div>

        {netIncome.map((item, index, array) => {
          return (
            <div key={index}>
              <div className={classes.input_area}>
                <div>
                  <label>Net Take Home Pay - Source {index + 1}</label>
                  {array.length > 1 ? (
                    <label
                      className={classes.input_area_delete_label}
                      onClick={() => removeSource(index)}
                    >
                      Delete
                    </label>
                  ) : (
                    ''
                  )}
                </div>
                <input
                  type="text"
                  className={classes.input_field}
                  name="amount"
                  value={
                    focused
                      ? item.amount
                      : item.amount.length > 0
                      ? formatAmountValue(item.amount)
                      : ''
                  }
                  onFocus={onFocus}
                  onBlur={onBlur}
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
            onClick={() => clickHandler({ frequency: '', amount: '' })}
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
