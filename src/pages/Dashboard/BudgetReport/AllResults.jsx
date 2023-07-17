import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Tab from './BudgetReportPages/Tab';
import { HomeTabsViews } from './BudgetReportPages/ExpensesTab/TabViews/HomeTabsViews';
import { ChartTabs } from './BudgetReportPages/ResultChart/ResultTabChartView';
import { Button, Header } from '../../../utlis/Imports';
import useFormContext from '../../../hooks/useFormContext';
import {
  lendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../action/actions';
import { removeAuth } from '../../../utlis/auth';
import { useNavigate } from 'react-router-dom';
import {
  copyAndMultiplyBudget,
  copyAndMultiplyDemographics,
} from '../../../utlis/Helper';
import { transformerData } from '../../../utlis/HelperData';
// import { useSelector } from 'react-redux';

const AllResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { lendings } = useSelector((state) => state.lending);

  const {
    data,
    setData,
    netIncome,
    setNetIncome,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
    setValue,
    activeTabNumber,
    categoryInputHandler,
    inputDemograpicData,
    inputBudgetData,
    setBudgetPayload,
    setScorePayload,
  } = useFormContext();
  const [resetFlag, setResetFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  // const inputDemograpicData = copyAndMultiplyDemographics(data);
  // const inputBudgetData = copyAndMultiplyBudget(data);

  // const lendingPayload = useMemo(() => {
  //   return {
  //     budget: {
  //       ...inputBudgetData.apiReq.budget,
  //     },
  //     demographics: { ...inputDemographicData.apiReq.demographics },
  //   };
  // }, [...inputDemograpicData ,inputBudgetData.apiReq.demographics]);

  // const demographicsPayload = useMemo(() => {
  //   return {
  //     demographics: { ...inputDemographicData.apiReq.demographics },
  //     transformer: {
  //       ...transformerData,
  //     },
  //   };
  // }, []);

  // const budgetPayload = useMemo(() => {
  //   return {
  //     budget: { ...inputBudgetData.apiReq.budget },
  //     demographics: { ...inputDemographicData.apiReq.demographics },
  //     transformer: {
  //       ...transformerData,
  //     },
  //   };
  // }, []);

  // const scorePayload = {
  //   demographics: { ...inputDemograpicData.apiReq.demographics },
  //   budget: { ...inputBudgetData.apiReq.budget },
  // };

  // const scorePayload = useMemo(( ) => {
  //   return {
  //     demographics: { ...inputDemographicData.apiReq.demographics },
  //     budget: { ...inputBudgetData.apiReq.budget },
  //   };
  // }, []);

  const dependencies = [
    dispatch,
    // useCallback(() => lendingPayload, [lendingPayload]),
    // useCallback(() => demographicsPayload, [demographicsPayload]),
    // useCallback(() => budgetPayload, [budgetPayload]),
    // useCallback(() => scorePayload, [scorePayload]),
    // lendingPayload,
    // demographicsPayload,
    // budgetPayload,
    // scorePayload,
    // useCallback(() => data, [data]),
  ];
  useEffect(() => {
    // if (resetFlag) {
    //   setResetFlag(false);
    // }

    const call = setTimeout(() => {
      console.log('1');
      // LendingGenerate(lendingPayload, dispatch);
      // (async () => {
      //   try {
      //     const response = await generateLending(lendingPayload);
      //     // Handle successful promise resolution
      //     console.log(response);
      //   }catch (error) {
      //     // Handle promise rejection or dispatch error
      //     console.error(error);
      //   }
      // })();

      Promise.all([lendingGenerate(lendingPayload, dispatch)]).then((data) => {
        // categoryInputHandler(
        //   'savings',
        //   Math.round(data[0]?.elements?.cash_excess / 12)
        // );
        console.log('5');
        // setData((prevData) => ({
        //   ...prevData,
        //   apiReq: {
        //     ...prevData.apiReq,
        //     budget: {
        //       ...prevData.apiReq.budget,
        //       savings: Math.round(data[0]?.elements?.cash_excess / 12),
        //     },
        //   },
        // }));
        const copyBudget = JSON.parse(JSON.stringify(budgetPayload));
        copyBudget.budget.savings = Math.round(data[0]?.elements?.cash_excess);
        console.log('5.1');
        const copyScore = JSON.parse(JSON.stringify(scorePayload));
        copyScore.budget.savings = Math.round(data[0]?.elements?.cash_excess);

        dispatch(demographicsGenerate(demographicsPayload));
        console.log('9');
        console.log('copyBudgetcopyBudget>>>>>>>>>>>>>>>>>>>>', copyBudget);
        dispatch(budgetsGenerate(copyBudget));
        dispatch(scoresGenerate(copyScore));
        setLoading(true);
      });
    }, 2000);

    return () => {
      clearTimeout(call);
    };
  }, [
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
        budget: {
          savings: null,
          other_debt_payments: '',
          mortgage_and_rent: '',
          vehicle_purchase_and_lease: '',
          health_insurance: '',
        },
      },
    }));

    setNetIncome([{ frequency: '', amount: '' }]);
    setResetFlag(true);
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
        budget: {
          savings: null,
          other_debt_payments: '',
          mortgage_and_rent: '',
          vehicle_purchase_and_lease: '',
          health_insurance: '',
        },
      },
    }));
    setNetIncome([{ frequency: '', amount: '' }]);
    setValue(1);
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
    <>
      <Header />
      <Button clearInput={startOver} text="Start Over" />
      <Button clearInput={clearInput} text="Clear Inputs" />
      <Button clearInput={logout} text="Logout" />
      <Tab tabs={HomeTabsViews} />
      {activeTabNumber === 4 ? ' ' : loading && <Tab tabs={ChartTabs} />}
      {/* <Tab tabs={ChartTabs} /> */}
    </>
  );
};

export default AllResult;
