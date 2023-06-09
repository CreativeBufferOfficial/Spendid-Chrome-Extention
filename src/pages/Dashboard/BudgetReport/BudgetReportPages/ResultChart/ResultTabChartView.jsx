import ResultChartAm4 from './ResultTabpages/ResultChartAm4';
import Opportunity from './ResultTabpages/Opportunity';
import BugetModal from './ResultTabpages/BudgetModal';

const Result = () => <ResultChartAm4 id="donutChart1" />;
const Opportunities = () => <Opportunity id="barChart1" />;
const Buget = () => <BugetModal />;

export const ChartTabs = [
  { label: 'Your Result', content: <Result /> },
  { label: 'Your Opportunities', content: <Opportunities /> },
  { label: 'Your Budget Modal', content: <Buget /> },
];
