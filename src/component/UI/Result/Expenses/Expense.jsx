import React, { useState } from 'react'
import classes from "./Expense.module.css"
import close from "../../../../assets/result/close.png"
import edit from "../../../../assets/result/edit.png"

const Expense = ({ title, amount1, amount2, toggle_title, gridView, isMajorExpensesTab }) => {
    const [showAmount, setShowAmount] = useState(false)
    const showAmountHandler = () => {
        setShowAmount((prev) => !prev)
    }
    return (
        <>
            <div className={classes.expenses} >
                <div className={classes.payment_view_field}>
                    <div className={classes.title} ><p>{title}</p> {isMajorExpensesTab ? "" : <img src={close} alt="close" />}   </div>
                    <div className={gridView ? classes.payment_value_grid : classes.payment_value} ><p>${amount1}</p><p>${amount2}</p></div>
                    <div className={classes.field_label} ><p onClick={showAmountHandler} ><img src={edit} alt="edit" /> Your Amount</p><p onClick={showAmountHandler} >  Your Peers</p></div>
                </div>
                <div className={showAmount ? classes.Toggle_input_field : classes.hide_Toggle_input_field} >
                    <div className={classes.toggle_input_header} >
                        <label>
                            {toggle_title}
                        </label>
                        <button  > Get Advice</button>
                        <button className={classes.clear_btn} type="button" >Clear</button>
                    </div>
                    <div className={classes.input_area} >
                        <input type="text" className={classes.input_field} />
                    </div>
                    <div className={classes.input_area} >
                        <div>
                            <label>Frequency</label>
                            <button type="button" >Clear</button>
                        </div>
                        <input type="text" className={classes.input_field} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Expense