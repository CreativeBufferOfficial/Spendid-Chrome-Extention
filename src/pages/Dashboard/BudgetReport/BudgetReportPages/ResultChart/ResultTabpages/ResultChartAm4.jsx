import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ResultChartAm4.module.css';
import {
  report,
  Loader,
  DonutChart,
  GaugeChart,
  ResultTitle,
  Logo,
  chart,
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
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Image,
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
  const {
    data,
    reportPayload,
    inputDemograpicData,
    inputBudgetData,
    chartSvg,
  } = useFormContext();
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
  // console.log('chartSvg', chartSvg);

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

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
    },
    section: {
      margin: 10,
      padding: 10,
      // flexGrow: 1,
      // flex: 1,
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '200px',
      height: '100px',
      marginTop: 15,
      marginBottom: 15,
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      marginTop: 20,
    },
    tableText: {
      fontSize: 18,
      color: '#30BDA9',
      textAlign: 'center',
      fontWeight: 900,
      marginTop: 15,
    },
    colorText: {
      fontSize: 15,
      marginTop: 3,
      color: '#30BDA9',
    },
    dateText: {
      fontSize: 12,
    },
    table: {
      marginTop: 10,
    },
    tableRowHeader: {
      flexDirection: 'row',
      backgroundColor: '#2980ba',
      color: '#FFFFFF',
    },
    tableRowData: {
      flexDirection: 'row',
      backgroundColor: '#D3D3D3',
      color: '#454545',
    },
    tableCellName: {
      width: '40%',
      fontSize: 12,
      padding: 5,
    },
    tableCell: {
      width: '20%',
      fontSize: 12,
      padding: 5,
      // borderStyle: 'solid',
      // borderWidth: 1,
      // borderColor: '#000000',
      // padding: 5,
    },
    tableCellYourAmount: {
      width: '50%',
      fontSize: 12,
      padding: 5,
      marginTop: 15,
    },
    result: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
    },
    imageChart: {
      width: '200px',
      height: '200px',
    },
    resultContent: {
      display: 'flex',
      flexDirection: 'column',
      width: '60%',
      marginTop: 15,
    },
    resultContentTitle: {
      fontSize: 14,
    },
    resultText: {
      fontSize: 12,
      marginTop: 20,
      textAlign: 'center',
    },
  });

  const generatePDF = () => {
    console.log('chart', chartSvg);

    const chart1 = chartSvg?.modalChart;
    const chart2 = chartSvg?.modalChartYours;
    const chart3 = chartSvg?.modalChartPeers;
    console.log('chart', chart1);
    console.log('chart', chart2);
    console.log('chart', chart3);
    // Create your PDF content
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Image src={Logo} style={styles.image} />
            <Text style={styles.colorText}>Report Date</Text>
            <Text style={styles.dateText}>13-06-2023</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>All Amounts Are Monthly</Text>

            <Text style={styles.colorText}>About You</Text>

            <View style={styles.table}>
              <View style={styles.tableRowData}>
                <View style={styles.tableCellYourAmount}>
                  <Text>Net Take Home Pay</Text>
                </View>
                <View style={styles.tableCellYourAmount}>
                  <Text>$ 10000</Text>
                </View>
              </View>
              <View style={styles.tableRowData}>
                <View style={styles.tableCellYourAmount}>
                  <Text>5-Digit Zip Code</Text>
                </View>
                <View style={styles.tableCellYourAmount}>
                  <Text>14001</Text>
                </View>
              </View>
              <View style={styles.tableRowData}>
                <View style={styles.tableCellYourAmount}>
                  <Text>Age</Text>
                </View>
                <View style={styles.tableCellYourAmount}>
                  <Text>25</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.colorText}>Result</Text>
            <View style={styles.result}>
              <Image src={chart} style={styles.imageChart} />
              <View style={styles.resultContent}>
                <Text style={styles.resultContentTitle}>
                  Predicted Saving Ability (PSA): $4,263
                </Text>
                <Text style={styles.resultText}>
                  It looks like you're doing all the right things budget-wise.
                  Do you have an active strategy for growing your savings, and
                  investing for the future? Be sure to sweep at least $4,263
                  into investments appropriate for your age and risk tolerance.
                  Do this, and your financial future looks bright!
                </Text>
              </View>
            </View>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <Text style={styles.tableText}>Your Opportunities</Text>
          <Text style={styles.dateText}>Versus Your Peers</Text>
          <Image src={chart1} style={styles.imageChart} />
          {/* <Image src={chart2} style={styles.imageChart} /> */}
          {/* <Image src={chart3} style={styles.imageChart} /> */}
          <Text style={styles.tableText}>
            50-30-20 Budget Modeling for : Needs / Wants / Financial Goals
          </Text>

          {/* <View></View> */}
        </Page>
        <Page size="A4" style={styles.page}>
          {/* FIXME: HIGHLITER   Table 1  */}
          <Text style={styles.tableText}>Major Expense Categories</Text>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCellName}>
                <Text>Name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Your Amount</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Your Peers</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Difference</Text>
              </View>
            </View>
            <View style={styles.tableRowData}>
              <View style={styles.tableCellName}>
                <Text>Rent or Mortgage Payment</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>$ 952</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>$ 950</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>$ 2</Text>
              </View>
            </View>
          </View>

          {/* FIXME: HIGHLITER   Table 2  */}
          <Text style={styles.tableText}>Other Expense categories</Text>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCellName}>
                <Text>Name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Your Amount</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Your Peers</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Difference</Text>
              </View>
            </View>
            <View style={styles.tableRowData}>
              <View style={styles.tableCellName}>
                <Text>Groceries</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>$ 652</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>$ 652</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>$ 0</Text>
              </View>
            </View>
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
