import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Tab from './BudgetReportPages/Tab';
import { HomeTabsViews } from './BudgetReportPages/ExpensesTab/TabViews/HomeTabsViews';
import { ChartTabs } from './BudgetReportPages/ResultChart/ResultTabChartView';
import { Button, Header } from '../../../utlis/Imports';
import useFormContext from '../../../hooks/useFormContext';
import {
  LendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../action/actions';

const AllResult = () => {
  const dispatch = useDispatch();
  const {
    setData,
    setNetIncome,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
    setValue,
  } = useFormContext();
  const [resetFlag, setResetFlag] = useState(false);
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
    setResetFlag(true);
    setValue(1);
  };

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
      <Button clearInput={clearInput} />
      <Tab tabs={HomeTabsViews} />
      <Tab tabs={ChartTabs} />
    </>
  );
};

export default AllResult;
