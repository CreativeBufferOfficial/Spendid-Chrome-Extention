import React from 'react';
import { Header, FormHeader } from '../../../utlis/Imports';
import classes from './Form.module.css';
import useFormContext from '../../../hooks/useFormContext';
import FormInput from './FormPagesList';
const Form = () => {
  const {
    data,
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
