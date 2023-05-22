import React, { useState } from 'react'
import classes from "./ResultTabsFormViews.module.css"
import aseIcon from "../../../../../assets/result/az.png"
import decIcon from "../../../../../assets/result/za.png"
import Expense from '../../../../../component/UI/Result/Expenses/Expense'
import RemoveIcon from "../../../../../assets/result/close.png"
import EditIcon from "../../../../../assets/result/edit_sm.png"
import Label from '../../../../../component/UI/Result/Labels/Label'
import GridEnable from "../../../../../assets/result/grid_enable.png"
import GridDisable from "../../../../../assets/result/grid_disable.png"
import BlockDisable from "../../../../../assets/result/block_disable.png"
import BlockEnable from "../../../../../assets/result/block_enable.png"
import Result from '../ResultChart/ResultChartAm4'
import ResultTitle from '../../../../../component/UI/Result/ResultTitle'


const OtherExpenses = () => {
    const [gridView, setGridView] = useState(false)
    const changeViewHandler = () => {
        setGridView((prev) => !prev)
    }
    return (
        <>
            <div>
                <div className={classes.label_instruction} >
                    <div className={classes.filter} >
                        <div className={classes.sort} ><p>Sort By</p><input placeholder='Yours Peers' /> </div>
                        <div className={classes.order} ><p>Order By</p><div><img src={aseIcon} /> <img src={decIcon} /></div></div>
                    </div>
                    <p>Click to Remove or Edit Any Expense Category</p>

                    <div className={classes.icon_label} >
                        <p>Remove <img src={RemoveIcon} alt="removeIcon" /></p>
                        <p>Or Edit <img src={EditIcon} alt='edit_Icon' /></p>
                    </div>

                </div>
                <Label />
                <div className={classes.view} >
                    <img src={gridView ? GridEnable : GridDisable} alt='grid' onClick={changeViewHandler} />
                    <img src={gridView ? BlockDisable : BlockEnable} alt="block" onClick={changeViewHandler} />
                </div>
                <Expense gridView={gridView} title="Rent or Mortgage Payment" amount1="1000" amount2="936" toggle_title="Fixed amount" />
                <div className={classes.remove_category} >
                    <ResultTitle title="Removed Categories" />
                </div>
            </div>
        </>
    )
}

export default OtherExpenses