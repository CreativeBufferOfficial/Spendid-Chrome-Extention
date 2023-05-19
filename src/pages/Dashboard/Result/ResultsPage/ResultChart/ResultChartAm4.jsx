import React from 'react';
import { useSelector } from 'react-redux';
import ResultTitle from '../../../../../component/UI/Result/ResultTitle';
import classes from './ResultChartAm4.module.css'
import GaugeChart from './GaugeChartAm4/GaugeChart';
import DonutChart from './DonutChart/DonutChart';
import report from "../../../../../assets/result/report.png"
const Result = () => {
    const { scores } = useSelector((state) => state.score);

    return (
        <>
            <div className={classes.content}>
                <div className={classes.headtitle}>
                    <div className={classes.designBox}></div>
                    <p>Your result</p>
                </div>
                <ResultTitle title="SPENDiD Budget Health Score" />
                <GaugeChart scores={scores && scores} />
                <ResultTitle title="Monthly Predicted Saving Ability" />
                <div className={classes.saving} >
                    <div >
                        <p>You</p>
                        <p className={classes.amount_field} >$3243</p>
                    </div>
                    <div>
                        <p>Peers</p>
                        <p className={classes.amount_field} >$2593</p>
                    </div>
                </div>
                <div className={classes.monthly_save} >
                    <p>Enter a Monthly Amount to Save</p>
                    <input type="text" className={classes.input_field} />
                    <button className={classes.clear} type="button" >Clear</button>
                </div>
                <ResultTitle title="Budget By Category" />
                <DonutChart />
                <div><button className={classes.save_report} >Save Report <img src={report} alt='report_icon' /></button></div>



            </div>
        </>


    );
};

export default Result;
