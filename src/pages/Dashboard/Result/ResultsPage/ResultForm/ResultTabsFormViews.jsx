import ProfileTab from "./ProfileTab"
import MajorExpense from "./MajorExpense";
import MonthlyBills from "./MonthlyBills";


const TabA = () => <ProfileTab />;
const TabB = () => <MajorExpense />
const TabC = () => <MonthlyBills />

export const inputFormTabs =
    [
        { label: 'Profile', content: <TabA /> },
        { label: 'Major Expense', content: <TabB /> },
        { label: 'Monthly Bills', content: <TabC /> },
    ]


