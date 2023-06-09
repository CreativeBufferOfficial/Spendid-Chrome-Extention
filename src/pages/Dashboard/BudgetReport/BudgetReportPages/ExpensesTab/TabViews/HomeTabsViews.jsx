import ProfileTab from '../TabPages/ProfileTab';
import MajorExpenseTab from '../TabPages/MajorExpenseTab';
import MonthlyBillsTab from '../TabPages/MonthlyBillsTab';
import ResultTab from '../TabPages/ResultTab';
import OtherExpensesTab from '../TabPages/OtherExpenses';

const Profile = () => <ProfileTab />;
const MajorExpense = () => <MajorExpenseTab />;
const MonthlyBills = () => <MonthlyBillsTab />;
const OtherExpenses = () => <OtherExpensesTab />;
const Result = () => <ResultTab />;

export const HomeTabsViews = [
  { label: 'Profile', content: <Profile /> },
  { label: 'Major Expense', content: <MajorExpense /> },
  { label: 'Monthly Bills', content: <MonthlyBills /> },
  { label: 'Other Expenses', content: <OtherExpenses /> },
  { label: 'Result', content: <Result /> },
];
