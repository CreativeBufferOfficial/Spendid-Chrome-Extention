import React, { useState, useEffect } from 'react';
import classes from './ResultTabsFormViews.module.css';
import aseIcon from '../../../../../assets/result/az.png';
import decIcon from '../../../../../assets/result/za.png';
import Expense from '../../../../../component/UI/Result/Expenses/Expense';
import RemoveIcon from '../../../../../assets/result/close.png';
import EditIcon from '../../../../../assets/result/edit_sm.png';
import Label from '../../../../../component/UI/Result/Labels/Label';
import GridEnable from '../../../../../assets/result/grid_enable.png';
import GridDisable from '../../../../../assets/result/grid_disable.png';
import BlockDisable from '../../../../../assets/result/block_disable.png';
import BlockEnable from '../../../../../assets/result/block_enable.png';
import ResultTitle from '../../../../../component/UI/Result/ResultTitle';
import {
  getStructureObject,
  filterOtherExpenses,
  getTabData,
  sortAscending,
  sortdecending,
} from '../../../../../utlis/Helper';
import { useSelector } from 'react-redux';

const OtherExpenses = () => {
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const [gridView, setGridView] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [removeCategory, setRemoveCategory] = useState([]);
  let filterDemographicsOtherExpensesData;
  const init = () => {
    const demographicsOtherExpensesObject = getStructureObject(demographics);
    const budgetsOtherExpensesObject = getStructureObject(budgets);

    //   console.log(demographicsOtherExpensesObject);
    //   console.log(budgetsOtherExpensesObject);

    filterDemographicsOtherExpensesData = filterOtherExpenses(
      demographicsOtherExpensesObject
    ).sort(sortdecending);

    const filterBudgetOtherExpensesData = filterOtherExpenses(
      budgetsOtherExpensesObject
    );

    //   console.log(filterDemographicsOtherExpensesData);
    //   console.log(filterBudgetOtherExpensesData);

    getTabData(
      filterDemographicsOtherExpensesData &&
        filterDemographicsOtherExpensesData,
      filterBudgetOtherExpensesData && filterBudgetOtherExpensesData
    );
    setSortedData(filterDemographicsOtherExpensesData);
  };
  useEffect(() => {
    init();
  }, []);

  const ascendingHandler = () => {
    const ascending = sortedData.sort(sortAscending);
    setSortedData([...ascending]);
  };
  const decendingHandler = () => {
    const decending = sortedData.sort(sortdecending);
    setSortedData([...decending]);
  };

  const removeCategoryHandler = (i) => {
    const removeCategoryData = sortedData.splice(i, 1);
    setRemoveCategory([...removeCategory, removeCategoryData]);
  };

  const restoreCategoryHandler = (i) => {
    const restoreCategoryData = removeCategory.splice(i, 1);
    setSortedData([...sortedData, restoreCategoryData]);
  };

  const changeViewHandler = () => {
    setGridView((prev) => !prev);
  };
  return (
    <>
      <div>
        <div className={classes.label_instruction}>
          <div className={classes.filter}>
            <div className={classes.sort}>
              <p>Sort By</p>
              <input placeholder="Yours Peers" />
            </div>
            <div className={classes.order}>
              <p>Order By</p>
              <div>
                <img src={aseIcon} onClick={ascendingHandler} />
                <img src={decIcon} onClick={decendingHandler} />
              </div>
            </div>
          </div>
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
        <div className={classes.view}>
          <img
            src={gridView ? GridEnable : GridDisable}
            alt="grid"
            onClick={changeViewHandler}
          />
          <img
            src={gridView ? BlockDisable : BlockEnable}
            alt="block"
            onClick={changeViewHandler}
          />
        </div>

        {sortedData &&
          sortedData.map((majorExpense, index) => (
            <Expense
              index={index}
              key={majorExpense.name}
              title={majorExpense.name}
              amount1={majorExpense.Amount}
              amount2={majorExpense.value}
              toggle_title="Fixed amount"
              gridView={gridView}
              onRemoveCategory={removeCategoryHandler}
              onRestoreCategory={restoreCategoryHandler}
            />
          ))}

        <div className={classes.remove_category}>
          <ResultTitle title="Removed Categories" />
        </div>
      </div>
    </>
  );
};

export default OtherExpenses;
