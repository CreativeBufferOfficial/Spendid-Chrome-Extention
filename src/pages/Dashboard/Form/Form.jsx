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
    isZipValid: zip.length > 4,
    isAgeValid: age.length > 1 && age >= 18,
    isHousehold_membersValid: household_members.length > 0,
    isHomeownerValid: is_homeowner.length === ' ',
    isNet_annual_incomeValid: net_annual_income.length > 0,
    isMortgage_and_rentValid: mortgage_and_rent.length > 0,
    isVehicle_purchase_and_leaseValid: vehicle_purchase_and_lease.length > 0,
    isHealth_insuranceValid: health_insurance.length > 0,
  };
  // console.log('condition', condition.isZipValid);
  // console.log('condition', condition.isAgeValid);
  // console.log('condition', condition.isHealth_insuranceValid);
  // console.log('condition', condition.isHomeownerValid);
  // console.log('condition', condition.isHousehold_membersValid);
  // console.log('condition', condition.isMortgage_and_rentValid);
  // console.log('condition', condition.isNet_annual_incomeValid);
  // console.log('condition', condition.isVehicle_purchase_and_leaseValid);

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

  const handlePrev = () => setPage((prev) => prev - 1);

  const handleNext = () => setPage((prev) => prev + 1);

  // const handleSubmit = e => {
  //     e.preventDefault()
  //     console.log(JSON.stringify(data))
  // }

  // console.log('prevHide', prevHide);
  // console.log('nextHide', nextHide);
  // console.log('cll>>>>', prevHide ? classes.removeButton : '');

  console.log('data>>>>>>', data);

  return (
    <>
      <Header />
      <FormHeader />

      <FormInput />
      <div className={classes.button_group}>
        <button
          className={classes.prev}
          onClick={handlePrev}
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
          onClick={handleNext}
          // disabled={disableNext}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default Form;
