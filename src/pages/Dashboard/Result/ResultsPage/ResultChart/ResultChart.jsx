import ResultChartAm4 from "./ResultChartAm4"
import Opportunity from "./Opportunity"
import BugetModal from "./BugetModal";

const Result = () => <ResultChartAm4 />
const Opportunities = () => <Opportunity />
const Buget = () => <BugetModal />

export const ChartTabs =
    [
        { label: 'Your Result', content: <Result /> },
        { label: 'Your Opportunities', content: <Opportunities /> },
        { label: 'Your Budget Modal', content: <Buget /> },
    ]










