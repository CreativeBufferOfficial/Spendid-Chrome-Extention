import React from 'react';
import { Logo } from '../../utlis/Imports';
import { getGrade } from '../../utlis/Helper';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// PDF Content
const PDFDocument = ({
  date,
  net_annual_income,
  zip,
  age,
  household_members,
  is_homeowner,
  breakeven,
  savingData,
  chartSvg,
  majorExpTableData,
  otherExpTableDataUpdate,
  otherExpTableData,
  removeCategory,
  scoreChart,
  barChart,
  // styles,
}) => {
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
      width: '350px',
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

  return (
    <>
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
              <View key={data.category} style={styles.tableRowData}>
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
            {(otherExpTableDataUpdate.length > 0
              ? otherExpTableDataUpdate
              : otherExpTableData
            ).map((data) => (
              <View key={data.category} style={styles.tableRowData}>
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
              <View key={data.category} style={styles.tableRowData}>
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
    </>
  );
};

export default PDFDocument;
