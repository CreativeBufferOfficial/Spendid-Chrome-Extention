import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Expense, Loader } from '../../../../../../utlis/Imports';
import {
  getStructureObject,
  filterMajorExpenses,
  getTabData,
} from '../../../../../../utlis/Helper';

const MajorExpense = () => {
  const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);

  const init = () => {
    if (demographics && budgets) {
      const demographicsObjects = getStructureObject(demographics);
      const budgetObjects = getStructureObject(budgets);
      const demographicsMajorExpensess =
        filterMajorExpenses(demographicsObjects);
      const budgetMajorExpensess = filterMajorExpenses(budgetObjects);
      getTabData(demographicsMajorExpensess, budgetMajorExpensess);
      setSortedData(demographicsMajorExpensess);
    }
  };

  useEffect(() => {
    init();
  }, [demographics, budgets]);

  return (
    <>
      {loadingBudgets ? (
        <Loader />
      ) : (
        sortedData.map((majorExpense) => (
          <Expense
            key={majorExpense.category}
            title={majorExpense.category}
            amount1={majorExpense.Amount}
            amount2={majorExpense.value}
            toggle_title="Fixed amount"
            isMajorExpensesTab={isMajorExpensesTab}
          />
        ))
      )}
    </>
  );
};

export default MajorExpense;
