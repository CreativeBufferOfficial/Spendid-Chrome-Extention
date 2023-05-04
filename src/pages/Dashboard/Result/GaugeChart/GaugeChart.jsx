import React, { useState } from 'react';
import Speedometer from './speedoMeterChart';
import iBtn from '../../../../assets/result/i_btn.png';
import classes from './GaugeChart.module.css';

const GaugeChart = ({ score }) => {
  // const [data, setData] = useState(0);

  return (
    <div className="dials">
      <Speedometer
        id="dial5"
        value={score}
        // title="Acceleration X"
      />
      <div className={classes.i_btn}>
        <img src={iBtn} alt="i_btn" />
      </div>
    </div>
  );
};

export default GaugeChart;
