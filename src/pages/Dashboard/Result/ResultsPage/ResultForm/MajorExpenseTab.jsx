import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Expense } from '../../../../../utlis/Imports';
import {
  getStructureObject,
  filterMajorExpenses,
  getTabData,
} from '../../../../../utlis/Helper';
import useFormContext from '../../../../../hooks/useFormContext';
import {
  LendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../../../action/actions';
import { useDispatch } from 'react-redux';

const MajorExpense = () => {
  const dispatch = useDispatch();
  const { lendingPayload, budgetPayload, demographicsPayload, scorePayload } =
    useFormContext();
  const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);

  const init = () => {
    const demographicsObjects = getStructureObject(demographics);
    const budgetObjects = getStructureObject(budgets);
    const demographicsMajorExpensess = filterMajorExpenses(demographicsObjects);

    const budgetMajorExpensess = filterMajorExpenses(budgetObjects);
    getTabData(demographicsMajorExpensess, budgetMajorExpensess);
    setSortedData(demographicsMajorExpensess);
  };
  // const apiCall = () => {
  //   dispatch(LendingGenerate(lendingPayload));
  //   dispatch(demographicsGenerate(demographicsPayload));
  //   dispatch(budgetsGenerate(budgetPayload));
  //   dispatch(scoresGenerate(scorePayload));
  // };

  useEffect(() => {
    init();
    // apiCall();
  }, []);

  return (
    <>
      {sortedData.map((majorExpense) => (
        <Expense
          key={majorExpense.category}
          title={majorExpense.category}
          amount1={majorExpense.Amount}
          amount2={majorExpense.value}
          toggle_title="Fixed amount"
          isMajorExpensesTab={isMajorExpensesTab}
        />
      ))}
    </>
  );
};

export default MajorExpense;
