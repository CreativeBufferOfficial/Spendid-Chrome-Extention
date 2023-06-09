import React, { useEffect, useState } from 'react';
import classes from '../TabViews/HomeTabsViews.module.css';
import {
  Expense,
  Label,
  RemoveCategory,
  RemoveIcon,
  EditIcon,
  ResultTitle,
  Loader,
} from '../../../../../../utlis/Imports';
import { useSelector } from 'react-redux';
import {
  getStructureObject,
  filterMonthlyBillExpenses,
  getTabData,
} from '../../../../../../utlis/Helper';
import useFormContext from '../../../../../../hooks/useFormContext';

const MonthlyBills = () => {
  const {
    removeCategoryTableData,
    setRemoveCategoryTableData,
    categoryInputHandler,
  } = useFormContext();
  const { lendings } = useSelector((state) => state.lending);
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const [savingsSet, setSavingsSet] = useState(false);
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const [removeCategory, setRemoveCategory] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const init = () => {
    // const savings = Math.round(lendings?.elements?.cash_excess / 12);
    // categoryInputHandler('savings', savings);
    if (demographics && budgets) {
      const demographicsMonthlyBillObject = getStructureObject(demographics);
      const budgetsMonthlyBillObject = getStructureObject(budgets);

      const filterdemographicsMonthlyBill = filterMonthlyBillExpenses(
        demographicsMonthlyBillObject
      );
      const filterBudgetMonthlyBill = filterMonthlyBillExpenses(
        budgetsMonthlyBillObject
      );
      getTabData(filterdemographicsMonthlyBill, filterBudgetMonthlyBill);
      setSortedData(filterdemographicsMonthlyBill);

      // const savings = Math.round(lendings?.elements?.cash_excess / 12);
      // categoryInputHandler('savings', savings);
    }
  };

  useEffect(() => {
    if (lendings && lendings.elements && !savingsSet) {
      const savings = Math.round(lendings.elements.cash_excess / 12);
      categoryInputHandler('savings', savings);
      setSavingsSet(true);
    }
  }, [lendings, categoryInputHandler, savingsSet]);

  useEffect(() => {
    init();
  }, [demographics, budgets]);

  const removeCategoryHandler = (i) => {
    const removeCategoryData = sortedData.splice(i, 1);
    // console.log(removeCategoryData);
    setRemoveCategory((prev) => [...prev, ...removeCategoryData]);
    setRemoveCategoryTableData((prev) => [...prev, ...removeCategoryData]);
  };

  const restoreCategoryHandler = (i) => {
    const restoreCategoryData = removeCategory.splice(i, 1);
    setSortedData([...sortedData, ...restoreCategoryData]);
    const restore = removeCategoryTableData.filter(
      (category) => category.category !== restoreCategoryData[0].category
    );
    setRemoveCategoryTableData([...restore]);
  };

  return (
    <>
      <div>
        <div className={classes.label_instruction}>
          <p>Click to Remove or Edit Any Expense Category</p>
          <div className={classes.icon_label}>
            <p>
              Remove <img src={RemoveIcon} alt="removeIcon" />
            </p>
            <p>
              Or Edit <img src={EditIcon} alt="edit_Icon" />
            </p>
          </div>
        </div>
        <Label />
        {loadingBudgets ? (
          <Loader />
        ) : (
          sortedData.map((monthlybillExpense, index) => (
            <Expense
              index={index}
              key={monthlybillExpense.category}
              title={monthlybillExpense.category}
              amount1={monthlybillExpense.Amount}
              amount2={monthlybillExpense.value}
              toggle_title="Fixed amount"
              onRemoveCategory={removeCategoryHandler}
            />
          ))
        )}

        <div className={classes.remove_category}>
          <div className={classes.removeCategoryTitle}>
            <ResultTitle title="Removed Categories" />
          </div>
          {removeCategory.map((removeCategory, index) => (
            <RemoveCategory
              index={index}
              key={removeCategory.category}
              title={removeCategory.category}
              amount1={removeCategory.Amount}
              amount2={removeCategory.value}
              onRestoreCategory={restoreCategoryHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MonthlyBills;
