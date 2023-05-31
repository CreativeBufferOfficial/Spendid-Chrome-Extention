import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Expense from '../../../../../component/UI/Result/Expenses/Expense';
import {
  getStructureObject,
  filterMajorExpenses,
  getTabData,
} from '../../../../../utlis/Helper';

const MajorExpense = () => {
  const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true);
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const demographicsObjects = getStructureObject(demographics);
  const budgetObjects = getStructureObject(budgets);
  const demographicsMajorExpensess = filterMajorExpenses(demographicsObjects);
  const budgetMajorExpensess = filterMajorExpenses(budgetObjects);
  getTabData(demographicsMajorExpensess, budgetMajorExpensess);
  return (
    <>
      {demographicsMajorExpensess.map((majorExpense) => (
        <Expense
          key={majorExpense.name}
          title={majorExpense.name}
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
