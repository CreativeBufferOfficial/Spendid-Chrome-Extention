import React from 'react'
import predictedIcon from "../../../../assets/result/predict.png"
import inputIcon from "../../../../assets/result/Ellipse_blue.png"
import peersIcon from "../../../../assets/result/peers.png"
import closeIcon from "../../../../assets/result/close.png"
import editIcon from "../../../../assets/result/edit_sm.png"
import classes from "./Label.module.css"

const Label = () => {
    return (
        <>
            <div>
                <div className={classes.label}>
                    <p><img src={predictedIcon} alt='predictIcon' />Predicted</p>
                    <p><img src={inputIcon} alt="inputIcon" />Input</p>
                    <p><img src={peersIcon} alt='preesIcon' />Peers</p>
                </div>
                <div className={classes.label_icon} >
                    <p>Remove <img src={closeIcon} alt='closeIcon' /></p>
                    <p>Or Edit<img src={editIcon} alt='editIcon' /></p>
                </div>
            </div>
        </>
    )
}

export default Label