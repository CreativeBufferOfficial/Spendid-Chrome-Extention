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
    prevHide,
    nextHide,
    submitHide,
  } = useFormContext();

  const handlePrev = () => setPage((prev) => prev - 1);

  const handleNext = () => setPage((prev) => prev + 1);

  // const handleSubmit = e => {
  //     e.preventDefault()
  //     console.log(JSON.stringify(data))
  // }

  console.log('prevHide', prevHide);
  console.log('nextHide', nextHide);
  console.log('cll>>>>', prevHide ? classes.removeButton : '');

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
          className={classes.next}
          onClick={handleNext}
          disabled={disableNext}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default Form;
