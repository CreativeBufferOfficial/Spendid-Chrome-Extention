import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ResultChartAm4.module.css';
import {
  report,
  Loader,
  DonutChart,
  GaugeChart,
  ResultTitle,
} from '../../../../../../utlis/Imports';
import { saveReport } from '../../../../../../action/actions';
import {
  filterSavings,
  getStructureObject,
  getTabData,
  filterCategory,
} from '../../../../../../utlis/Helper';
import useFormContext from '../../../../../../hooks/useFormContext';
import { transformerData } from '../../../../../../utlis/HelperData';
import { useDispatch } from 'react-redux';
// import PDFGenerator from '../../../../Pdf/PDFGenerator';
import {
  Document,
  Page,
  View,
  Text,
  PDFDownloadLink,
} from '@react-pdf/renderer';

const Result = ({ id }) => {
  const dispatch = useDispatch();
  const { lendings } = useSelector((state) => state.lending);
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  console.log('demographics', demographics);
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const { loadingScore, scores } = useSelector((state) => state.score);
  const { data, reportPayload, inputDemograpicData, inputBudgetData } =
    useFormContext();
  const { net_annual_income } = data.apiReq.demographics;
  const [savingData, setSavingData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const initial = () => {
    if (demographics && budgets && scores) {
      const demographicsObjects = getStructureObject(demographics);
      const budgetObjects = getStructureObject(budgets);
      const category = filterCategory(budgetObjects);

      const demographicsMajorExpensess = filterSavings(demographicsObjects);
      const budgetMajorExpensess = filterSavings(budgetObjects);
      getTabData(demographicsMajorExpensess, budgetMajorExpensess);

      setSavingData(demographicsMajorExpensess);
      setCategoryData(category);
    }
  };

  useEffect(() => {
    initial();
  }, [demographics, budgets, scores]);

  // const handleMouseEnter = (event) => {
  //   event.target.classList.add('show');
  // };
  // const handleMouseLeave = (event) => {
  //   event.target.classList.remove('show');
  // };
  console.log('inputDemograpicData', inputDemograpicData);
  console.log('inputBudgetData', inputBudgetData);

  const generatePDF = () => {
    // Create your PDF content
    const MyDocument = (
      <Document>
        <Page>
          <View>
            <Text>This is a dynamically generated PDF!</Text>
          </View>
        </Page>
      </Document>
    );

    return MyDocument;
  };

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
    console.log('reportPayload', reportPayload);
    dispatch(saveReport(reportPayload));
  };

  return (
    <>
      {loadingScore ? (
        <Loader />
      ) : (
        <>
          <div className={classes.content}>
            <div className={classes.headtitle}>
              <div className={classes.designBox}></div>
              <p>Your result</p>
            </div>
            <ResultTitle
              title="SPENDiD Budget Health Score"
              // handleMouseEnter={handleMouseEnter}
              // handleMouseLeave={handleMouseLeave}
            />
            {/* <div className={classes.popup_overlay}></div>
        <div className={classes.popup_content}>
          <h3>Popup Content</h3>
          <p>This is a popup view that appears on hover.</p>
        </div> */}
            <GaugeChart scores={scores && scores} />
            <ResultTitle
              title="Monthly Predicted Saving Ability"
              // handleMouseEnter={handleMouseEnter}
              // handleMouseLeave={handleMouseLeave}
            />
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
            {/* <div className={classes.monthly_save}>
          <p>Enter a Monthly Amount to Save</p>
          <input type="text" className={classes.input_field} />
          <button className={classes.clear} type="button">
            Clear
          </button>
        </div> */}
            <ResultTitle title="Budget By Category" />

            <DonutChart
              id={id}
              data={categoryData}
              netAnnualIncome={net_annual_income}
            />

            <div className={classes.btn_Report}>
              <PDFDownloadLink
                onClick={saveReportHandler}
                className={classes.save_report}
                document={generatePDF()}
                fileName="generated_pdf.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : `Save Report`
                }
                Save Report
                <img
                  src={report}
                  style={{ marginLeft: '10px' }}
                  alt="report_icon"
                />
              </PDFDownloadLink>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Result;
