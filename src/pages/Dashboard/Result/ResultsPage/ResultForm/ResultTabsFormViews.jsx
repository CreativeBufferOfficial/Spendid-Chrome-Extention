import ProfileTab from "./ProfileTab"
import MajorExpense from "./MajorExpenseTab";
import MonthlyBills from "./MonthlyBillsTab";
import ResultTab from "./ResultTab";

const TabA = () => <ProfileTab />;
const TabB = () => <MajorExpense />
const TabC = () => <MonthlyBills />
const TabD = () => <MonthlyBills />
const Result = () => <ResultTab />

export const inputFormTabs =
    [
        { label: 'Profile', content: <TabA /> },
        { label: 'Major Expense', content: <TabB /> },
        { label: 'Monthly Bills', content: <TabC /> },
        { label: 'Other Expenses', content: <TabD /> },
        { label: 'Result', content: <Result /> },
    ]


