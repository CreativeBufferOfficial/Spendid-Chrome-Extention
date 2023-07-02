import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Expense, Loader } from '../../../../../../utlis/Imports';
import {
  getStructureObject,
  filterMajorExpenses,
  getTabData,
  getDiffrenceForTable,
} from '../../../../../../utlis/Helper';
// import useFormContext from '../../../../../../hooks/useFormContext';

const MajorExpense = () => {
  // let { tableData, setTableData } = useFormContext();
  console.log('call');
  // const [majorExpensesTableData, setMajorExpensesTableData] = useState([]);

  const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true);
  const [majorExpensesSortedData, setMajorExpensesSortedData] = useState([]);
  const { demographics } = useSelector((state) => state.demographics);

  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  // console.log('demographics>>>', demographics);
  // console.log('budgets', budgets);
  const init = () => {
    if (demographics && budgets) {
      const demographicsObjects = getStructureObject(demographics);
      const budgetObjects = getStructureObject(budgets);
      const demographicsMajorExpensess =
        filterMajorExpenses(demographicsObjects);
      const budgetMajorExpensess = filterMajorExpenses(budgetObjects);
      getTabData(demographicsMajorExpensess, budgetMajorExpensess);
      setMajorExpensesSortedData(demographicsMajorExpensess);
      // const differenceData = getDiffrenceForTable(demographicsMajorExpensess);
      // setTableData(differenceData);
      // console.log('differenceData>>>>>>>>>>>>>>', differenceData);
    }
  };
  useEffect(() => {
    // init();
  }, []);
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
