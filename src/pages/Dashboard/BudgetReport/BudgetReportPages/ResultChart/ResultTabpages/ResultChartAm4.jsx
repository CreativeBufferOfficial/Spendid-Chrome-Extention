import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './ResultChartAm4.module.css';
import {
  report,
  Loader,
  DonutChart,
  GaugeChart,
  ResultTitle,
  Logo,
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
  getGrade,
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
  const { net_annual_income } = data.apiReq.demographics;
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

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
    },
    section: {
      margin: 10,
      padding: 10,
      display: 'flex',
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
    chartText: {
      textAlign: 'left',
      fontSize: 18,
      marginTop: 20,
      marginLeft: 20,
    },
    chartText2: {
      fontSize: 12,
      marginTop: 10,
      marginLeft: 20,
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

    resultChart: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageChart: {
      width: '250px',
      height: '200px',
      marginBottom: 15,
      marginRight: 60,
    },
    imageBarChart: {
      width: '400px',
      height: '250px',
      marginBottom: 15,
      marginRight: 30,
    },
    grade: {
      marginRight: 30,
    },
    imageChartPageTwo: {
      width: '200px',
      height: '200px',
      marginBottom: 10,
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
      textAlign: 'left',
    },
    ModalChartView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 15,
    },
    modalChartCol: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });

  const generatePDF = () => {
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

    const otherExpTableDataUpdate = otherExpTableData.filter((category) => {
      return removeCategory.some(
        (filterItem) => filterItem.category !== category.category
      );
    });
    const { zip, age, net_annual_income, is_homeowner, household_members } =
      data?.apiReq?.demographics;
    const date = getPDfGenerateDate();

    // Create your PDF content
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Image src={Logo} style={styles.image} />
            <Text style={styles.colorText}>Report Date</Text>
            <Text style={styles.dateText}>{date}</Text>
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
                  <Text>{`${net_annual_income}`}</Text>
                </View>
              </View>
              <View style={styles.tableRowData}>
                <View style={styles.tableCellYourAmount}>
                  <Text>5-Digit Zip Code</Text>
                </View>
                <View style={styles.tableCellYourAmount}>
                  <Text>{zip}</Text>
                </View>
              </View>
              <View style={styles.tableRowData}>
                <View style={styles.tableCellYourAmount}>
                  <Text>Age</Text>
                </View>
                <View style={styles.tableCellYourAmount}>
                  <Text>{age}</Text>
                </View>
              </View>
              <View style={styles.tableRowData}>
                <View style={styles.tableCellYourAmount}>
                  <Text>HouseHold</Text>
                </View>
                <View style={styles.tableCellYourAmount}>
                  <Text>{household_members}</Text>
                </View>
              </View>
              <View style={styles.tableRowData}>
                <View style={styles.tableCellYourAmount}>
                  <Text>HouseType</Text>
                </View>
                <View style={styles.tableCellYourAmount}>
                  <Text>{is_homeowner ? 'Owner' : 'Renter'}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.colorText}>Result</Text>
            <View style={styles.result}>
              <View style={styles.resultChart}>
                <Text style={styles.grade}>{getGrade(breakeven)}</Text>
                <Image src={scoreChart} style={styles.imageChart} />
              </View>
              <View style={styles.resultContent}>
                <Text style={styles.resultContentTitle}>
                  {`Predicted Saving Ability (PSA): $ ${savingData[0]?.Amount}`}
                </Text>
                <Text style={styles.resultText}>
                  {`It looks like you're doing all the right things budget-wise.
                  Do you have an active strategy for growing your savings, and
                  investing for the future? Be sure to sweep at least $ ${savingData[0]?.Amount}
                  into investments appropriate for your age and risk tolerance.
                  Do this, and your financial future looks bright!`}
                </Text>
              </View>
            </View>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <Text style={styles.chartText}>Your Opportunities</Text>
          <Text style={styles.chartText2}>Versus Your Peers</Text>
          <Image src={barChart} style={styles.imageBarChart} />
          <Text style={styles.tableText}>
            50-30-20 Budget Modeling for : Needs / Wants / Financial Goals
          </Text>
          <View style={styles.ModalChartView}>
            <View style={styles.modalChartCol}>
              <Text style={styles.dateText}>50-30-20 Model</Text>
              <Image
                src={chartSvg[chartSvg.length - 1]}
                style={styles.imageChartPageTwo}
              />
            </View>
            <View style={styles.modalChartCol}>
              <Text style={styles.dateText}>Your Peers</Text>
              <Image
                src={chartSvg[chartSvg.length - 2]}
                style={styles.imageChartPageTwo}
              />
            </View>
            <View style={styles.modalChartCol}>
              <Text style={styles.dateText}>You</Text>
              <Image
                src={chartSvg[chartSvg.length - 3]}
                style={styles.imageChartPageTwo}
              />
            </View>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          {/* FIXME: HIGHLIGTER   Table 1  */}
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
            {majorExpTableData.map((data) => (
              <View style={styles.tableRowData}>
                <View style={styles.tableCellName}>
                  <Text>{data.category}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.Amount}`}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.value}`}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.difference}`}</Text>
                </View>
              </View>
            ))}
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
            {otherExpTableDataUpdate.map((data) => (
              <View style={styles.tableRowData}>
                <View style={styles.tableCellName}>
                  <Text>{data.category}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.Amount}`}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.value}`}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.difference}`}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.tableText}>Remove categories</Text>
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

            {removeCategory.map((data) => (
              <View style={styles.tableRowData}>
                <View style={styles.tableCellName}>
                  <Text>{data.category}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.Amount}`}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.value}`}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{`$ ${data.difference}`}</Text>
                </View>
              </View>
            ))}
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
    dispatch(saveReport(reportPayload));
  };

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
            {/* <ResultTitle
              title="SPENDiD Budget Health Score"
              // handleMouseEnter={handleMouseEnter}
              // handleMouseLeave={handleMouseLeave}
            /> */}
            {/* <div className={classes.popup_overlay}></div>
        <div className={classes.popup_content}>
          <h3>Popup Content</h3>
          <p>This is a popup view that appears on hover.</p>
        </div> */}
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
            {/* <div className={classes.monthly_save}>
          <p>Enter a Monthly Amount to Save</p>
          <input type="text" className={classes.input_field} />
          <button className={classes.clear} type="button">
            Clear
          </button>
        </div> */}
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
