import React from 'react';
import ResultChartAm4 from '../../ResultChart/ResultTabpages/ResultChartAm4';
import Opportunity from '../../ResultChart/ResultTabpages/Opportunity';
import BugetModal from '../../ResultChart/ResultTabpages/BudgetModal';

const Result = () => {
  const id = {
    chart1: 'chart1',
    chart2: 'chart2',
    chart3: 'chart3',
  };

  return (
    <>
      <ResultChartAm4 id="donutChart2" />
      <Opportunity id="barChart2" />
      <BugetModal id={id} />
    </>
  );
};

export default Result;
