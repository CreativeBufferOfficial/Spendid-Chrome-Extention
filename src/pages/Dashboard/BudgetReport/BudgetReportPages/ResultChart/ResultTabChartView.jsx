import ResultChartAm4 from './ResultTabpages/ResultChartAm4';
import Opportunity from './ResultTabpages/Opportunity';
import BugetModal from './ResultTabpages/BudgetModal';

const YourResult = () => <ResultChartAm4 id="donutChart1" id2="GaugeChart2" />;
const Opportunities = () => <Opportunity id="barChart1" />;
const Buget = () => <BugetModal />;

export const ChartTabs = [
  { label: 'Your Result', content: <YourResult /> },
  { label: 'Your Opportunities', content: <Opportunities /> },
  { label: 'Your Budget Modal', content: <Buget /> },
];
