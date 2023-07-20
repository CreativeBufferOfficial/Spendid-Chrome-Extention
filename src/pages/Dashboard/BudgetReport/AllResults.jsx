import React, { useEffect, useState } from 'react';
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
const AllResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { lendings } = useSelector((state) => state.lending);
  var fieldsToKeep = ['isAuthenticated', 'email', 'name'];
  const {
    setData,
    setNetIncome,
    lendingPayload,
    demographicsPayload,
    budgetPayload,
    scorePayload,
    setValue,
    activeTabNumber,
    setGlobalSelectedIndex,
  } = useFormContext();
  const [resetFlag, setResetFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const call = setTimeout(() => {
      Promise.all([lendingGenerate(lendingPayload, dispatch)]).then((data) => {
        const copyBudget = JSON.parse(JSON.stringify(budgetPayload));
        copyBudget.budget.savings = Math.round(data[0]?.elements?.cash_excess);
        const copyScore = JSON.parse(JSON.stringify(scorePayload));
        copyScore.budget.savings = Math.round(data[0]?.elements?.cash_excess);
        dispatch(demographicsGenerate(demographicsPayload));
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
    var keys = Object.keys(localStorage);
    keys.forEach(function (key) {
      if (!fieldsToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
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
    var keys = Object.keys(localStorage);
    keys.forEach(function (key) {
      if (!fieldsToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    // localStorage.removeItem('zip');
    // localStorage.removeItem('age');
    setGlobalSelectedIndex(Array(10).fill(-1));
    navigate('/dashboard');
  };

  const logout = () => {
    navigate('/');
    removeAuth();
  };

  return (
    <>
      <Header />
      <Button clearInput={startOver} text="Start Over" />
      <Button clearInput={clearInput} text="Clear Inputs" />
      <Button clearInput={logout} text="Logout" />
      <Tab tabs={HomeTabsViews} />
      {activeTabNumber === 4 ? ' ' : loading && <Tab tabs={ChartTabs} />}
    </>
  );
};

export default AllResult;
