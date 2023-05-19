import React from 'react'
import classes from "./ResultChartAm4.module.css"
import BarChart from './BarChart/BarChart'
import ResultTitle from '../../../../../component/UI/Result/ResultTitle'

const Opportunity = () => {
    return (
        <>
            <div className={classes.content}>
                <div className={classes.headtitle}>
                    <div className={classes.designBox}></div>
                    <p>Your Opportunities</p>
                </div>
                <ResultTitle title="Focus Areas" />
                <BarChart />
            </div>
        </>
    )
}

export default Opportunity