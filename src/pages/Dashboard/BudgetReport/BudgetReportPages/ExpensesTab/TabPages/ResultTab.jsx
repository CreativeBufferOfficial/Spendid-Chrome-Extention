import React from 'react';
import ResultChartAm4 from '../../ResultChart/ResultTabpages/ResultChartAm4';
import Opportunity from '../../ResultChart/ResultTabpages/Opportunity';
import BudgetModal from '../../ResultChart/ResultTabpages/BudgetModal';

const Result = () => {
  const id = {
    chart1: 'chart1',
    chart2: 'chart2',
    chart3: 'chart3',
  };

  return (
    <>
      <ResultChartAm4 id="donutChart2" id2="GaugeChart1" />
      <Opportunity id="barChart2" />
      <BudgetModal id={id} />
    </>
  );
};

export default Result;
