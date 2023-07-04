import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Tab from './BudgetReportPages/Tab';
import { HomeTabsViews } from './BudgetReportPages/ExpensesTab/TabViews/HomeTabsViews';
import { ChartTabs } from './BudgetReportPages/ResultChart/ResultTabChartView';
import { Button, Header } from '../../../utlis/Imports';
import useFormContext from '../../../hooks/useFormContext';
// import { debounce } from 'lodash';
import {
  LendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../action/actions';
import { removeAuth } from '../../../utlis/auth';
import { useNavigate } from 'react-router-dom';

const AllResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    setData,
    setNetIncome,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
    setValue,
    activeTabNumber,
  } = useFormContext();
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    if (resetFlag) {
      setResetFlag(false);
    }
    const call = setTimeout(() => {
      dispatch(LendingGenerate(lendingPayload));
      dispatch(demographicsGenerate(demographicsPayload));
      dispatch(budgetsGenerate(budgetPayload));
      dispatch(scoresGenerate(scorePayload));
    }, 2000);
    return () => {
      clearInterval(call);
    };
  }, [
    resetFlag,
    dispatch,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
  ]);

  const clearInput = () => {
    setData((prev) => ({
      ...prev,
      apiReq: {
        ...prev.apiReq,
        demographics: {
          zip: '',
          age: '',
          household_members: 1,
          is_homeowner: false,
          net_annual_income: null,
        },
      },
    }));

    setNetIncome([{ frequency: '', amount: 0 }]);
    // setResetFlag(true);
    setValue(1);
  };

  const startOver = () => {
    setData((prev) => ({
      ...prev,
      apiReq: {
        ...prev.apiReq,
        demographics: {
          zip: '',
          age: '',
          household_members: 1,
          is_homeowner: false,
          net_annual_income: null,
        },
      },
    }));
    localStorage.removeItem('zip');
    localStorage.removeItem('age');
    navigate('/dashboard');
  };

  const logout = () => {
    navigate('/');
    removeAuth();
  };
  console.log('ALLRESULT');

  return (
    // <>
    //   {loadingScore ? (
    //     <Loader />
    //   ) : (
    //     <>
    //       <Header />
    //       <Button clearInput={clearInput} />
    //       <ResultPageInput tabs={inputFormTabs} />
    //       {/* <ResultPageInput tabs={ChartTabs} /> */}
    //     </>
    //   )}
    // </>

    <>
      <Header />
      <Button clearInput={startOver} text="Start Over" />
      <Button clearInput={clearInput} text="Clear Inputs" />
      <Button clearInput={logout} text="Logout" />
      <Tab tabs={HomeTabsViews} />
      {activeTabNumber === 4 ? '' : <Tab tabs={ChartTabs} />}
    </>
  );
};

export default AllResult;
