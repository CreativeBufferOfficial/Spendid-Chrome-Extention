import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './ResultChartAm4.module.css';
import {
  report,
  Loader,
  DonutChart,
  GaugeChart,
  ResultTitle,
  MyDocument,
} from '../../../../../../utlis/Imports';
import { saveReport } from '../../../../../../action/actions';
import {
  filterSavings,
  getStructureObject,
  getTabData,
  filterCategory,
  getDiffrenceForTable,
  getPDfGenerateDate,
  filterMajorExpenses,
  filterOtherExpenses,
} from '../../../../../../utlis/Helper';
import useFormContext from '../../../../../../hooks/useFormContext';
import { transformerData } from '../../../../../../utlis/HelperData';
import { useDispatch } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Result = ({ id, id2 }) => {
  const dispatch = useDispatch();
  const { lendings } = useSelector((state) => state.lending);
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const { loadingScore, scores } = useSelector((state) => state.score);

  const breakeven = scores && scores?.breakeven;
  const {
    data,
    inputDemograpicData,
    inputBudgetData,
    chartSvg,
    scoreChart,
    barChart,
  } = useFormContext();
  // const { net_annual_income } = data.apiReq.demographics;
  const [savingsSet, setSavingsSet] = useState(false);
  const [savingData, setSavingData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  // const [savingPDFData, setSavingPDFData] = useState('');
  const [majorExpTableData, setMajorExpTableData] = useState([]);
  const [otherExpTableData, setOtherExpTableData] = useState([]);
  const [save, setSave] = useState(0);

  const savings = useMemo(
    (e) => {
      return Math.round(lendings?.elements?.cash_excess / 12) &&
        !isNaN(Math.round(lendings?.elements?.cash_excess / 12)) &&
        typeof Math.round(lendings?.elements?.cash_excess / 12) != 'undefined'
        ? Math.round(lendings?.elements?.cash_excess / 12)
        : savings || 0;
    },
    [lendings?.elements?.cash_excess]
  );

  useEffect(() => {
    if (demographics && budgets) {
      const mergeDemographics = getStructureObject(demographics);
      const mergeBudget = getStructureObject(budgets);

      //Major Expenses Table Data
      const demographicsMajorExp = filterMajorExpenses(mergeDemographics);
      const budgetMajorExp = filterMajorExpenses(mergeBudget);
      getTabData(demographicsMajorExp, budgetMajorExp);

      const majorExpensetableData = getDiffrenceForTable(demographicsMajorExp);
      setMajorExpTableData(majorExpensetableData);

      // Other Expenses Table Data
      const demographicsOtherExp = filterOtherExpenses(mergeDemographics);
      const budgetOtherExp = filterOtherExpenses(mergeBudget);
      getTabData(demographicsOtherExp, budgetOtherExp);
      const otherExpensestableData = getDiffrenceForTable(demographicsOtherExp);
      setOtherExpTableData(otherExpensestableData);

      //Chart Category Data
      const category = filterCategory(mergeBudget);
      setCategoryData(category);

      // Saving Data
      const demographicsMajorExpensess = filterSavings(mergeDemographics);
      const budgetMajorExpensess = filterSavings(mergeBudget);
      getTabData(demographicsMajorExpensess, budgetMajorExpensess);
      setSavingData(demographicsMajorExpensess);
    }
    setSavingsSet(false);
  }, [demographics, budgets]);

  useEffect(() => {
    if (savings) {
      setSave(savings);
    }
  }, [savings]);

  //  PDF style

  const otherExpensesRemove = localStorage.getItem('otherExpensesRemove')
    ? JSON.parse(localStorage.getItem('otherExpensesRemove'))
    : [];

  const monthlyExpensesRemove = localStorage.getItem('monthlyExpensesRemove')
    ? JSON.parse(localStorage.getItem('monthlyExpensesRemove'))
    : [];

  const removeCategoryTableData = [
    ...otherExpensesRemove,
    ...monthlyExpensesRemove,
  ];
  const removeCategory = getDiffrenceForTable(removeCategoryTableData);

  const isInRemoveCategory = (obj) => {
    return removeCategory.some((item) => item.value === obj.value);
  };

  const otherExpTableDataUpdate = otherExpTableData.filter(
    (item) => !isInRemoveCategory(item)
  );

  const { zip, age, net_annual_income, is_homeowner, household_members } =
    data?.apiReq?.demographics;
  const date = getPDfGenerateDate();

  const saveReportHandler = () => {
    const reportPayload = {
      userInfo: {
        email: '',
        name: '',
        usecase: null,
        edu: null,
        key: 'hCqpmeIgXhrnRnMwAanDT2qqocZDUtQ1yTZHUkle',
        reportId: '2006',
      },
      apiReq: {
        demographics: {
          ...inputDemograpicData.apiReq.demographics,
        },
        transformer: {
          ...transformerData,
        },
        budget: {
          ...inputBudgetData.apiReq.budget,
        },
      },
      callDemographicsAPIRes: {
        ...demographics,
      },
      callBudgetAPIRes: {
        ...budgets,
      },
      callScoringAPIRes: {
        ...scores,
      },
      callLendingScoreAPIRes: {
        ...lendings,
      },
      eliminated: {},
    };
    dispatch(saveReport(reportPayload));
  };

  // Generate PDF
  const MyPDFDocument = () => (
    <MyDocument
      date={date}
      net_annual_income={net_annual_income}
      zip={zip}
      age={age}
      household_members={household_members}
      is_homeowner={is_homeowner}
      breakeven={breakeven}
      savingData={savingData}
      chartSvg={chartSvg}
      majorExpTableData={majorExpTableData}
      otherExpTableDataUpdate={otherExpTableDataUpdate}
      otherExpTableData={otherExpTableData}
      removeCategory={removeCategory}
      scoreChart={scoreChart}
      barChart={barChart}
    />
  );

  return (
    <>
      {loadingScore && loadingBudgets && loadingDemographics ? (
        <Loader />
      ) : (
        <>
          <div className={classes.content}>
            <div className={classes.headtitle}>
              <div className={classes.designBox}></div>
              <p>Your result</p>
            </div>
            <GaugeChart id={id2} />
            <ResultTitle
              title="Monthly Predicted Saving Ability"
              // handleMouseEnter={handleMouseEnter}
              // handleMouseLeave={handleMouseLeave}
            />
            <div className={classes.saving}>
              <div>
                <p>You</p>
                <p
                  className={
                    savingData && savingData[0]?.Amount > 0
                      ? classes.amount_field
                      : classes.less_Saving
                  }
                >
                  ${savingData && savingData[0]?.Amount}
                </p>
              </div>
              <div>
                <p>Peers</p>
                <p
                  className={
                    savingData && savingData[0]?.value > 0
                      ? classes.amount_field
                      : classes.less_Saving
                  }
                >
                  ${savingData && savingData[0]?.value}
                </p>
              </div>
            </div>

            <ResultTitle title="Budget By Category" />

            {categoryData && (
              <DonutChart
                id={id}
                data={categoryData}
                netAnnualIncome={net_annual_income}
              />
            )}

            <div className={classes.btn_Report}>
              <PDFDownloadLink
                onClick={saveReportHandler}
                className={classes.save_report}
                document={<MyPDFDocument />}
                fileName="generated_pdf.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    'Loading document...'
                  ) : (
                    <>
                      Save Report
                      <img
                        src={report}
                        style={{ marginLeft: '10px' }}
                        alt="report_icon"
                      />
                    </>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Result;
