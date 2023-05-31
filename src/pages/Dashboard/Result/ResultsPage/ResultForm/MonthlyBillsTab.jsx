import React from 'react';
import classes from './ResultTabsFormViews.module.css';
import Expense from '../../../../../component/UI/Result/Expenses/Expense';
import RemoveIcon from '../../../../../assets/result/close.png';
import EditIcon from '../../../../../assets/result/edit_sm.png';
import Label from '../../../../../component/UI/Result/Labels/Label';
import { useSelector } from 'react-redux';
import {
  getStructureObject,
  filterMonthlyBillExpenses,
  getTabData,
} from '../../../../../utlis/Helper';

const MonthlyBills = () => {
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);

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
        {filterdemographicsMonthlyBill.map((monthlybillExpense) => (
          <Expense
            key={monthlybillExpense.name}
            title={monthlybillExpense.name}
            amount1={monthlybillExpense.Amount}
            amount2={monthlybillExpense.value}
            toggle_title="Fixed amount"
          />
        ))}
      </div>
    </>
  );
};

export default MonthlyBills;
