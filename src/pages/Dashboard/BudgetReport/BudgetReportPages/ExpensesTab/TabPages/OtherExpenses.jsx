import React, { useState, useEffect, useCallback } from 'react';
import classes from '../TabViews/HomeTabsViews.module.css';
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
} from '../../../../../../utlis/Imports';
import {
  getStructureObject,
  filterOtherExpenses,
  getTabData,
  sortAscending,
  sortDescending,
  sortDescendingAmount,
} from '../../../../../../utlis/Helper';
import { useSelector } from 'react-redux';
import useFormContext from '../../../../../../hooks/useFormContext';
const OtherExpenses = () => {
  const { categoryInputHandler, removeCategoryInputHandler } = useFormContext();
  const { lendings } = useSelector((state) => state.lending);
  const [savingsSet, setSavingsSet] = useState(false);
  const { demographics } = useSelector((state) => state.demographics);
  const { budgets } = useSelector((state) => state.budget);
  const [gridView, setGridView] = useState(false);
  const [removeCategory, setRemoveCategory] = useState([]);
  const [otherExpensesSortedData, setOtherExpensesSortedData] = useState([]);
  const [bgColor, setBgColor] = useState([]);

  const init = () => {
    if (demographics && budgets) {
      const demographicsOtherExpensesObject = getStructureObject(demographics);
      const budgetsOtherExpensesObject = getStructureObject(budgets);
      const filterDemographicsOtherExpensesData = filterOtherExpenses(
        demographicsOtherExpensesObject
      );
      const filterBudgetOtherExpensesData = filterOtherExpenses(
        budgetsOtherExpensesObject
      );
      getTabData(
        filterDemographicsOtherExpensesData,
        filterBudgetOtherExpensesData
      );

      const isInRemoveCategory = (obj) => {
        return removeCategory.some((item) => item.value === obj.value);
      };

      const updatedTableData = filterDemographicsOtherExpensesData.filter(
        (item) => !isInRemoveCategory(item)
      );

      setOtherExpensesSortedData(
        updatedTableData.length > 0
          ? updatedTableData
          : filterDemographicsOtherExpensesData
      );
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

  const ascendingHandler = () => {
    const ascending = otherExpensesSortedData.sort(sortAscending);
    setOtherExpensesSortedData([...ascending]);
  };
  const decendingHandler = () => {
    const decending = otherExpensesSortedData.sort(sortDescending);
    setOtherExpensesSortedData([...decending]);
  };

  const removeCategoryHandler = useCallback(
    (i, name, value = 0) => {
      const removeCategoryData = otherExpensesSortedData.splice(i, 1);
      setRemoveCategory([...removeCategory, ...removeCategoryData]);
      const prevRemoveData = localStorage.getItem('otherExpensesRemove')
        ? JSON.parse(localStorage.getItem('otherExpensesRemove'))
        : [];

      localStorage.setItem(
        'otherExpensesRemove',
        JSON.stringify([...prevRemoveData, ...removeCategoryData])
      );
      categoryInputHandler(name, value);
    },
    [categoryInputHandler, otherExpensesSortedData, removeCategory]
  );

  const restoreCategoryHandler = useCallback(
    (i, name) => {
      const restoreCategoryData = removeCategory.splice(i, 1);
      setOtherExpensesSortedData([
        ...otherExpensesSortedData,
        ...restoreCategoryData,
      ]);
      const prevRemoveData = localStorage.getItem('otherExpensesRemove')
        ? JSON.parse(localStorage.getItem('otherExpensesRemove'))
        : [];

      const updateRemoveCategory = prevRemoveData.filter(
        (category) => category.category !== restoreCategoryData[0].category
      );

      localStorage.setItem(
        'otherExpensesRemove',
        JSON.stringify([...updateRemoveCategory])
      );
      removeCategoryInputHandler(name);
    },
    [removeCategoryInputHandler, removeCategory, otherExpensesSortedData]
  );
  const changeViewHandler = () => {
    setGridView((prev) => !prev);
  };
  const selectformDataHandlerChange = (event) => {
    const option = event.target.value;
    if (option === 'Your Amount') {
      setOtherExpensesSortedData([
        ...otherExpensesSortedData.sort(sortDescendingAmount),
      ]);
    } else if (option === 'Your Peers') {
      setOtherExpensesSortedData([
        ...otherExpensesSortedData.sort(sortDescending),
      ]);
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
                <img
                  src={aseIcon}
                  onClick={ascendingHandler}
                  alt="AscendingIcon"
                />
                <img
                  src={decIcon}
                  onClick={decendingHandler}
                  alt="desendingIcon"
                />
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

        {otherExpensesSortedData &&
          otherExpensesSortedData.map((majorExpense, index) => (
            <Expense
              index={index}
              key={majorExpense.category}
              title={majorExpense.category}
              amount1={majorExpense.Amount}
              amount2={majorExpense.value}
              toggle_title="Fixed amount"
              gridView={gridView}
              onRemoveCategory={removeCategoryHandler}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          ))}

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

export default OtherExpenses;
