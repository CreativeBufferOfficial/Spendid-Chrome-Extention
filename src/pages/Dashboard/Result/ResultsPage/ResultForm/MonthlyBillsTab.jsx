import React, { useEffect, useState } from 'react';
import classes from './ResultTabsFormViews.module.css';
import {
  Expense,
  Label,
  RemoveCategory,
  RemoveIcon,
  EditIcon,
  ResultTitle,
} from '../../../../../utlis/Imports';
import {
  LendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../../../action/actions';

import { useSelector } from 'react-redux';
import {
  getStructureObject,
  filterMonthlyBillExpenses,
  getTabData,
} from '../../../../../utlis/Helper';
import useFormContext from '../../../../../hooks/useFormContext';
import { useDispatch } from 'react-redux';

const MonthlyBills = () => {
  const dispatch = useDispatch();

  const { lendingPayload, demographicsPayload, budgetPayload, scorePayload } =
    useFormContext();
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const [removeCategory, setRemoveCategory] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const init = () => {
    const demographicsMonthlyBillObject = getStructureObject(demographics);
    const budgetsMonthlyBillObject = getStructureObject(budgets);

    // console.log(demographicsMonthlyBillObject);
    // console.log(budgetsMonthlyBillObject);

    const filterdemographicsMonthlyBill = filterMonthlyBillExpenses(
      demographicsMonthlyBillObject
    );
    const filterBudgetMonthlyBill = filterMonthlyBillExpenses(
      budgetsMonthlyBillObject
    );
    getTabData(filterdemographicsMonthlyBill, filterBudgetMonthlyBill);
    setSortedData(filterdemographicsMonthlyBill);
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

  const removeCategoryHandler = (i) => {
    const removeCategoryData = sortedData.splice(i, 1);
    setRemoveCategory([...removeCategory, ...removeCategoryData]);
  };

  const restoreCategoryHandler = (i) => {
    const restoreCategoryData = removeCategory.splice(i, 1);
    setSortedData([...sortedData, ...restoreCategoryData]);
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
        {sortedData.map((monthlybillExpense) => (
          <Expense
            key={monthlybillExpense.category}
            title={monthlybillExpense.category}
            amount1={monthlybillExpense.Amount}
            amount2={monthlybillExpense.value}
            toggle_title="Fixed amount"
            onRemoveCategory={removeCategoryHandler}
          />
        ))}
        <div className={classes.remove_category}>
          <ResultTitle title="Removed Categories" />
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
