import React, { useEffect, useState } from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../component/Loader/Loader';
import ResultPageInput from './ResultsPage/ResultPageInput';
import { inputFormTabs } from './ResultsPage/ResultForm/ResultTabsFormViews';
import { ChartTabs } from './ResultsPage/ResultChart/ResultChartView';
import Button from './Button';
import useFormContext from '../../../hooks/useFormContext';
import {
  LendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../action/actions';

const AllResult = () => {
  const dispatch = useDispatch();
  // const { loadingScore } = useSelector((state) => state.score);
  const {
    data,
    setData,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
  } = useFormContext();
  const [resetFlag, setResetFlag] = useState(false);
  console.log('data', data);
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
        // budget: {
        //   savings: null,
        //   other_debt_payments: null,
        //   mortgage_and_rent: null,
        //   vehicle_purchase_and_lease: null,
        //   health_insurance: null,
        // },
      },
    }));
    setResetFlag(true);
  };

  // const callApi = () => {
  //   dispatch(LendingGenerate(lendingPayload));
  //   dispatch(demographicsGenerate(demographicsPayload));
  //   dispatch(budgetsGenerate(budgetPayload));
  //   dispatch(scoresGenerate(scorePayload));
  // };

  useEffect(() => {
    // callApi();
    if (resetFlag) {
      setResetFlag(false);
    }
    const call = setTimeout(() => {
      console.log('Inside TimeOut');
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
      <ResultPageInput tabs={inputFormTabs} />
      <ResultPageInput tabs={ChartTabs} />
    </>
  );
};

export default AllResult;
