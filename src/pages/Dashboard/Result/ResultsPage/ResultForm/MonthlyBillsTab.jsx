import React from 'react'
import classes from "./ResultTabsFormViews.module.css"
import Expense from '../../../../../component/UI/Result/Expenses/Expense'
import RemoveIcon from "../../../../../assets/result/close.png"
import EditIcon from "../../../../../assets/result/edit_sm.png"
import Label from '../../../../../component/UI/Result/Labels/Label'

const MonthlyBills = () => {
    return (
        <>
            <div>
                <div className={classes.label_instruction} >
                    <p>Click to Remove or Edit Any Expense Category</p>
                    <div className={classes.icon_label} >
                        <p>Remove <img src={RemoveIcon} alt="removeIcon" /></p>
                        <p>Or Edit <img src={EditIcon} alt='edit_Icon' /></p>
                    </div>
                </div>
                <Label />
                <Expense title="Rent or Mortgage Payment" amount1="1000" amount2="936" toggle_title="Fixed amount" />
            </div>
        </>
    )
}

export default MonthlyBills