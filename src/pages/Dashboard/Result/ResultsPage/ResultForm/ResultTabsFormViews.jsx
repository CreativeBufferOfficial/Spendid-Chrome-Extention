import ProfileTab from "./ProfileTab"
import MajorExpenseTab from "./MajorExpenseTab";
import MonthlyBillsTab from "./MonthlyBillsTab";
import ResultTab from "./ResultTab";
import OtherExpensesTab from "./OtherExpenses"

const Profile = () => <ProfileTab />;
const MajorExpense = () => <MajorExpenseTab />
const MonthlyBills = () => <MonthlyBillsTab />
const OtherExpenses = () => <OtherExpensesTab />
const Result = () => <ResultTab />

export const inputFormTabs =
    [
        { label: 'Profile', content: <Profile /> },
        { label: 'Major Expense', content: <MajorExpense /> },
        { label: 'Monthly Bills', content: <MonthlyBills /> },
        { label: 'Other Expenses', content: <OtherExpenses /> },
        { label: 'Result', content: <Result /> },
    ]


