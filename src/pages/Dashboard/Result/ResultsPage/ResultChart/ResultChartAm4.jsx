import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ResultTitle from '../../../../../component/UI/Result/ResultTitle';
import classes from './ResultChartAm4.module.css';
import GaugeChart from './GaugeChartAm4/GaugeChart';
import DonutChart from './DonutChart/DonutChart';
import { report } from '../../../../../utlis/Imports';
import {
  filterSavings,
  getStructureObject,
  getTabData,
  filterCategory,
} from '../../../../../utlis/Helper';
const Result = ({ id }) => {
  const [savingData, setSavingData] = useState([]);

  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const { scores } = useSelector((state) => state.score);

  const initial = () => {
    const demographicsObjects = getStructureObject(demographics);
    const budgetObjects = getStructureObject(budgets);
    // console.log('demographicsObjects', demographicsObjects);
    // console.log('budgetObjects', budgetObjects);
    const demographicsMajorExpensess = filterSavings(demographicsObjects);
    const budgetMajorExpensess = filterSavings(budgetObjects);
    getTabData(demographicsMajorExpensess, budgetMajorExpensess);

    setSavingData(demographicsMajorExpensess);
  };
  // console.log('savingData', savingData);

  useEffect(() => {
    initial();
  }, []);

  return (
    <>
      <div className={classes.content}>
        <div className={classes.headtitle}>
          <div className={classes.designBox}></div>
          <p>Your result</p>
        </div>
        <ResultTitle title="SPENDiD Budget Health Score" />
        <GaugeChart scores={scores && scores} />
        <ResultTitle title="Monthly Predicted Saving Ability" />
        <div className={classes.saving}>
          <div>
            <p>You</p>
            <p className={classes.amount_field}>
              ${savingData && savingData[0]?.Amount}
            </p>
          </div>
          <div>
            <p>Peers</p>
            <p className={classes.amount_field}>
              ${savingData && savingData[0]?.value}
            </p>
          </div>
        </div>
        <div className={classes.monthly_save}>
          <p>Enter a Monthly Amount to Save</p>
          <input type="text" className={classes.input_field} />
          <button className={classes.clear} type="button">
            Clear
          </button>
        </div>
        <ResultTitle title="Budget By Category" />
        <DonutChart id={id} />
        <div>
          <button className={classes.save_report}>
            Save Report <img src={report} alt="report_icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
