import React from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import FormHeader from '../../../component/UI/Form/FormHeader';
import classes from './Form.module.css';
import useFormContext from '../../../hooks/useFormContext';
import FormInput from './FormInput';
const Form = () => {
  const {
    page,
    setPage,
    data,
    title,
    canSubmit,
    disablePrev,
    disableNext,
    prevRedirectHome,
    nextHide,
    submitHide,
    nextHandler,
    prevHandler,
    currentHandler,
  } = useFormContext();

  const { zip, age, household_members, is_homeowner, net_annual_income } =
    data.apiReq.demographics;
  const {
    other_debt_payments,
    mortgage_and_rent,
    vehicle_purchase_and_lease,
    health_insurance,
  } = data.apiReq.budget;

  const condition = {
    isZipValid: page === 0 && zip.toString().length > 4,
    isAgeValid: page === 1 && age.toString().length > 1 && age >= 18,
    isHousehold_membersValid:
      page === 2 && household_members.toString().length > 0,
    isHomeownerValid: page === 3 && is_homeowner === (true || false),
    isMortgage_and_rentValid:
      page === 4 && mortgage_and_rent.toString().length > 0,
    isVehicle_purchase_and_leaseValid:
      page === 5 && vehicle_purchase_and_lease.toString().length > 0,
    isHealth_insuranceValid:
      page === 9 && health_insurance.toString().length > 0,
    isNet_annual_incomeValid:
      page === 10 && net_annual_income.toString().length > 0,
  };
  console.log('condition', condition.isZipValid);
  console.log('condition', condition.isAgeValid);
  console.log('condition', condition.isHealth_insuranceValid);
  console.log('condition', condition.isHomeownerValid);
  console.log('condition', condition.isHousehold_membersValid);
  console.log('condition', condition.isMortgage_and_rentValid);
  console.log('condition', condition.isNet_annual_incomeValid);
  console.log('condition', condition.isVehicle_purchase_and_leaseValid);

  const allValidation =
    condition.isZipValid ||
    condition.isAgeValid ||
    condition.isHealth_insuranceValid ||
    condition.isHomeownerValid ||
    condition.isHousehold_membersValid ||
    condition.isMortgage_and_rentValid ||
    condition.isNet_annual_incomeValid ||
    condition.isVehicle_purchase_and_leaseValid;

  console.log('isValid', allValidation);

  // const handlePrev = () => setPage((prev) => prev - 1);

  // const handleNext = () => setPage((prev) => prev + 1);

  // const handleSubmit = e => {
  //     e.preventDefault()
  //     console.log(JSON.stringify(data))
  // }

  // console.log('prevHide', prevHide);
  // console.log('nextHide', nextHide);
  // console.log('cll>>>>', prevHide ? classes.removeButton : '');

  return (
    <>
      <Header />
      <FormHeader />

      <FormInput />
      <div className={classes.button_group}>
        <button
          className={classes.prev}
          onClick={prevHandler}
          disabled={disablePrev}
        >
          {'<'}
        </button>
        <button
          className={
            allValidation
              ? nextHide
                ? classes.hideButton
                : classes.next
              : classes.next_disable
          }
          onClick={allValidation ? nextHandler : currentHandler}
          // disabled={disableNext}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default Form;
