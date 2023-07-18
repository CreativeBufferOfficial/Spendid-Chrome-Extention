import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Expense } from '../../../../../../utlis/Imports';
import {
  getStructureObject,
  filterMajorExpenses,
  getTabData,
} from '../../../../../../utlis/Helper';
import useFormContext from '../../../../../../hooks/useFormContext';

const MajorExpense = () => {
  let { categoryInputHandler } = useFormContext();
  const { lendings } = useSelector((state) => state.lending);
  const { demographics } = useSelector((state) => state.demographics);
  const { budgets } = useSelector((state) => state.budget);
  console.log('call');
  const [savingsSet, setSavingsSet] = useState(false);
  const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true);
  const [majorExpensesSortedData, setMajorExpensesSortedData] = useState([]);

  const [bgColor, setBgColor] = useState([]);

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
    }
  }, [demographics, budgets]);

  return (
    <>
      {majorExpensesSortedData.map((majorExpense, index) => (
        <Expense
          index={index}
          key={majorExpense.category}
          title={majorExpense.category}
          amount1={majorExpense.Amount}
          amount2={majorExpense.value}
          toggle_title="Fixed amount"
          isMajorExpensesTab={isMajorExpensesTab}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
      ))}
    </>
  );
};

export default MajorExpense;
