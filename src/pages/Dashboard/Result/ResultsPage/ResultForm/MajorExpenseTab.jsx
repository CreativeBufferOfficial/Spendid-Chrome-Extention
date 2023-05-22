import React, { useState } from 'react'
import classes from "./ResultTabsFormViews.module.css"
import Expense from '../../../../../component/UI/Result/Expenses/Expense'


const MajorExpense = () => {
    const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true)
    return (
        <>
            <Expense title="Rent or Mortgage Payment" amount1="1000" amount2="936" toggle_title="Fixed amount" isMajorExpensesTab={isMajorExpensesTab} />
        </>
    )
}

export default MajorExpense