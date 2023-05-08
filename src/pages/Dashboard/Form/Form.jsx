import React from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import FormHeader from '../../../component/UI/Form/FormHeader';
import classes from './Form.module.css';
import useFormContext from '../../../hooks/useFormContext';
import FormInput from './FormInput';
const Form = () => {
  const {
    page,
    disablePrev,
    nextHide,
    nextHandler,
    prevHandler,
    currentHandler,
    globalSelectedIndex,
  } = useFormContext();

  const isValid = globalSelectedIndex[page] !== -1;
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
            isValid
              ? nextHide
                ? classes.hideButton
                : classes.next
              : classes.next_disable
          }
          onClick={isValid ? nextHandler : currentHandler}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

export default Form;
