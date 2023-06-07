import React, { useState, useEffect } from 'react';
import classes from './ResultTabsFormViews.module.css';
import {
  Expense,
  Label,
  RemoveCategory,
  ResultTitle,
  EditIcon,
  RemoveIcon,
  BlockEnable,
  BlockDisable,
  GridDisable,
  GridEnable,
  decIcon,
  aseIcon,
} from '../../../../../utlis/Imports';
import {
  getStructureObject,
  filterOtherExpenses,
  getTabData,
  sortAscending,
  sortdecending,
  sortdecendingAmount,
  sortAscendingAmount,
} from '../../../../../utlis/Helper';
import {
  LendingGenerate,
  demographicsGenerate,
  budgetsGenerate,
  scoresGenerate,
} from '../../../../../action/actions';
import { useSelector } from 'react-redux';
import useFormContext from '../../../../../hooks/useFormContext';
import { useDispatch } from 'react-redux';
import Loader from '../../../../../component/Loader/Loader';
const OtherExpenses = () => {
  const dispatch = useDispatch();

  const { lendingPayload, demographicsPayload, budgetPayload, scorePayload } =
    useFormContext();
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  // console.log('demographics>>>>>>>>>>>>>.', demographics);
  // console.log('budgets>>>>>>>>>>>>>>>>', budgets);
  const [gridView, setGridView] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [removeCategory, setRemoveCategory] = useState([]);

  const init = () => {
    if (demographics && budgets) {
      const demographicsOtherExpensesObject = getStructureObject(demographics);
      const budgetsOtherExpensesObject = getStructureObject(budgets);

      // console.log('d>>>', demographicsOtherExpensesObject);
      // console.log('b>>>', budgetsOtherExpensesObject);

      const filterDemographicsOtherExpensesData = filterOtherExpenses(
        demographicsOtherExpensesObject
      );

      const filterBudgetOtherExpensesData = filterOtherExpenses(
        budgetsOtherExpensesObject
      );

      // console.log('fddddd>>>>>', filterBudgetOtherExpensesData);

      getTabData(
        filterDemographicsOtherExpensesData,
        filterBudgetOtherExpensesData
      );
      setSortedData(filterDemographicsOtherExpensesData);
      // console.log(
      //   'asdasdasdadasdasd>>>>>',
      //   filterDemographicsOtherExpensesData
      // );
    }
  };

  useEffect(() => {
    init();
  }, [demographics, budgets]);

  // console.log('budgetPayload', budgetPayload);

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
    setRemoveCategory([...removeCategory, ...removeCategoryData]);
  };

  const restoreCategoryHandler = (i) => {
    const restoreCategoryData = removeCategory.splice(i, 1);
    setSortedData([...sortedData, ...restoreCategoryData]);
  };
  const changeViewHandler = () => {
    setGridView((prev) => !prev);
  };
  const selectformDataHandlerChange = (event) => {
    const option = event.target.value;
    // console.log('option', option);
    if (option === 'Your Amount') {
      setSortedData([...sortedData.sort(sortdecendingAmount)]);
      // console.log('sortedDataYourAmount', sortedData);
    } else if (option === 'Your Peers') {
      setSortedData([...sortedData.sort(sortdecending)]);
      // console.log('sortedDataInPeers', sortedData);
    }
  };
  return (
    <>
      <div>
        <div className={classes.label_instruction}>
          <div className={classes.filter}>
            <div className={classes.sort}>
              <p>Sort By</p>
              <select onChange={selectformDataHandlerChange}>
                <option>Your Amount</option>
                <option>Your Peers</option>
                {/* <option>Diffrence</option> */}
              </select>
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

        {loadingBudgets ? (
          <Loader />
        ) : (
          sortedData &&
          sortedData.map((majorExpense, index) => (
            <Expense
              index={index}
              key={majorExpense.category}
              title={majorExpense.category}
              amount1={majorExpense.Amount}
              amount2={majorExpense.value}
              toggle_title="Fixed amount"
              gridView={gridView}
              onRemoveCategory={removeCategoryHandler}
            />
          ))
        )}

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

export default OtherExpenses;
