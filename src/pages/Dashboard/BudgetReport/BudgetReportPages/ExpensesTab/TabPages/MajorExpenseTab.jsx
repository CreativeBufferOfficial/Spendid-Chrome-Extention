import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Expense, Loader } from '../../../../../../utlis/Imports';
import {
  getStructureObject,
  filterMajorExpenses,
  getTabData,
} from '../../../../../../utlis/Helper';
import useFormContext from '../../../../../../hooks/useFormContext';
// import { debounce } from 'lodash';
// import { useDispatch } from 'react-redux';

const MajorExpense = () => {
  // const dispatch = useDispatch();
  let { categoryInputHandler } = useFormContext();
  const { lendings } = useSelector((state) => state.lending);
  const { demographics } = useSelector((state) => state.demographics);
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  console.log('call');
  const [savingsSet, setSavingsSet] = useState(false);
  const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true);
  const [majorExpensesSortedData, setMajorExpensesSortedData] = useState([]);

  // const [majorExpensesSortedData, setMajorExpensesSortedData] = useState([]);

  // console.log('demographics>>>', demographics);
  // console.log('budgets', budgets);
  // const init = () => {
  //   if (demographics && budgets) {
  //     const demographicsObjects = getStructureObject(demographics);
  //     const budgetObjects = getStructureObject(budgets);
  //     const demographicsMajorExpensess =
  //       filterMajorExpenses(demographicsObjects);
  //     const budgetMajorExpensess = filterMajorExpenses(budgetObjects);
  //     getTabData(demographicsMajorExpensess, budgetMajorExpensess);
  //     console.log('inside init');
  //     setMajorExpensesSortedData(demographicsMajorExpensess);
  //     console.log('inside init if');
  //   }
  // };

  useEffect(() => {
    if (lendings && lendings.elements && !savingsSet) {
      const savings = Math.round(lendings.elements.cash_excess / 12);
      categoryInputHandler('savings', savings);
      setSavingsSet(true);
    }
  }, [lendings, categoryInputHandler, savingsSet]);

  useEffect(() => {
    if (demographics && budgets) {
      const demographicsObjects = getStructureObject(demographics);
      const budgetObjects = getStructureObject(budgets);
      const demographicsMajorExpensess =
        filterMajorExpenses(demographicsObjects);
      const budgetMajorExpensess = filterMajorExpenses(budgetObjects);
      getTabData(demographicsMajorExpensess, budgetMajorExpensess);
      setMajorExpensesSortedData(demographicsMajorExpensess);
      // const savings = Math.round(lendings?.elements?.cash_excess / 12);
      // categoryInputHandler('savings', savings);
      // console.log('savingssss', savings);
    }
  }, [demographics, budgets]);

  // setTableData(majorExpensesSortedData);
  return (
    <>
      {loadingBudgets ? (
        <Loader />
      ) : (
        majorExpensesSortedData.map((majorExpense) => (
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
