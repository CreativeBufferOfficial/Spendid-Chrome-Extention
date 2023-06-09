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
import { removeAuth } from '../../../utlis/auth';
import { useNavigate } from 'react-router-dom';
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
  } = useFormContext();
  const [resetFlag, setResetFlag] = useState(false);

  // useEffect(() => {
  //   if (resetFlag) {
  //     setResetFlag(false);
  //   }
  //   const call = setTimeout(() => {
  //     dispatch(LendingGenerate(lendingPayload));
  //     // if (Object.keys(lendings).length > 0) {
  //     //   dispatch(demographicsGenerate(demographicsPayload));
  //     //   dispatch(budgetsGenerate(budgetPayload));
  //     //   dispatch(scoresGenerate(scorePayload));
  //     // }
  //   }, 2000);

  //   return () => {
  //     clearInterval(call);
  //   };
  // }, [
  //   resetFlag,
  //   dispatch,
  //   lendingPayload,
  //   // demographicsPayload,
  //   // budgetPayload,
  //   // scorePayload,
  // ]);
  // const generateLending = async (lendingPayload) => {
  //   try {
  //     const response = await dispatch(LendingGenerate(lendingPayload));
  //     // Handle successful dispatch
  //     console.log(response);
  //     return response;
  //   } catch (error) {
  //     // Handle dispatch error
  //     console.error(error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    // if (resetFlag) {
    //   setResetFlag(false);
    // }
    // const savings = Math.round(lendings?.elements?.cash_excess / 12);
    // categoryInputHandler('savings', savings);

    const call = setTimeout(() => {
      console.log('1');
      LendingGenerate(lendingPayload, dispatch);
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
      console.log('5');
      // if (Object.keys(lendings).length > 0) {
      //   console.log('XXXXXX');
      dispatch(demographicsGenerate(demographicsPayload));
      console.log('9');

      dispatch(budgetsGenerate(budgetPayload));
      dispatch(scoresGenerate(scorePayload));
      // }
    }, 2000);

    return () => {
      clearInterval(call);
    };
  }, [
    // resetFlag,
    dispatch,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
  ]);

  // categoryInputHandler(
  //   'savings',
  //   Math.round(lendings?.elements?.cash_excess / 12)
  // );

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

  // function abc() {
  //   setData((prev) => ({
  //     ...prev,
  //     apiReq: {
  //       ...prev.apiReq,
  //       budget: {
  //         savings: lendings?.elements?.cash_excess,
  //       },
  //     },
  //   }));
  // }
  // abc();

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
      {activeTabNumber === 4 ? ' ' : <Tab tabs={ChartTabs} />}
      {/* <Tab tabs={ChartTabs} /> */}
    </>
  );
};

export default AllResult;
