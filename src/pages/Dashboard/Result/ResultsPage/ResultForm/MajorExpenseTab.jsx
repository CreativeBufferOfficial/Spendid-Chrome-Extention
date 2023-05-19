import React from 'react'
import classes from "./ResultTabsFormViews.module.css"
import Expense from '../../../../../component/UI/Result/Expenses/Expense'


const MajorExpense = () => {
    return (
        <>
            <Expense title="Rent or Mortgage Payment" amount1="1000" amount2="936" toggle_title="Fixed amount" />
        </>
    )
}

export default MajorExpense