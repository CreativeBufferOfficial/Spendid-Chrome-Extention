import React from 'react'
import classes from "./ResultChartAm4.module.css"
import questionIcon from "../../../../../assets/result/question.png"
import markGreenIcon from "../../../../../assets/result/Ellipse_green.png"
import markRedIcon from "../../../../../assets/result/Ellipse_red.png"
import markPurpleIcon from "../../../../../assets/result/Ellipse_purple.png"
import BugetChart from './DonutChart/BugetChart'
// import DonutChart from './DonutChart/DonutChart'

const BugetModal = ({ id }) => {
    return (
        <>
            <div className={classes.content}>
                <div className={classes.headtitle}>
                    <div className={classes.designBox}></div>
                    <p>Your Budget Model (50-30-20)</p>
                    <img src={questionIcon} alt='icon' />
                </div>
                <div className={classes.chart_labels}>
                    <div className={classes.chart_label} ><img src={markGreenIcon} /><p>Needs</p></div>
                    <div className={classes.chart_label} ><img src={markPurpleIcon} /><p>Wants</p></div>
                    <div className={classes.chart_label}  ><img src={markRedIcon} /><p>Financial Goals</p></div>
                </div>

                <div>
                    <div className={classes.chart_header_label} >50-30-20 Model</div>
                    <BugetChart id={id ? id.chart1 : "chartdiv1"} />
                </div>
                <div>
                    <div className={classes.chart_header_label} >Your Peers</div>
                    <BugetChart id={id ? id.chart2 : "chartdiv2"} />
                </div>
                <div>
                    <div className={classes.chart_header_label} >You</div>
                    <BugetChart id={id ? id.chart3 : "chartdiv3"} />
                </div>
            </div>
        </>
    )
}

export default BugetModal