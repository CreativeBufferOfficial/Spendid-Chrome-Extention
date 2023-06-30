import React, { useRef, useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import { iBtn } from '../../../utlis/Imports';
import classes from './GaugeChart.module.css';
import { useSelector } from 'react-redux';
import useFormContext from '../../../hooks/useFormContext';

function GaugeChart() {
  const { setScoreChart } = useFormContext();

  const { scores } = useSelector((state) => state.score);
  const breakeven = scores && scores?.breakeven;

  const chartRef = useRef(null);

  useEffect(() => {
    // Create chart instance
    const chart = am4core.create(chartRef.current, am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    chart.innerRadius = -50;
    let colorSet = new am4core.ColorSet();

    // Create axis
    const axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.strictMinMax = true;

    // Create ranges
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.labels.template.disabled = true;
    axis.renderer.ticks.template.disabled = true;
    axis.renderer.grid.template.disabled = true;
    let range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    var gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color('#5868eb'));
    gradient.addColor(am4core.color('#68aca5'));

    gradient.rotation = 0;

    range1.axisFill.fill = gradient;
    let range3 = axis.axisRanges.create();
    range3.value = 0;
    range3.endValue = 50;
    range3.axisFill.fillOpacity = 1;
    range3.axisFill.fill = colorSet.getIndex(0);

    var gradient1 = new am4core.LinearGradient();
    gradient1.addColor(am4core.color('#ff0000'));
    gradient1.addColor(am4core.color('#5868eb'));

    range3.axisFill.fill = gradient1;

    var range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(4);
    range2.axisFill.zIndex = -1;

    // Add first and last labels
    const label0 = axis.axisRanges.create();
    label0.value = 0;
    label0.label.text = '0';

    const label100 = axis.axisRanges.create();
    label100.value = 100;
    label100.label.text = '100';

    // Create hand
    const hand = chart.hands.push(new am4charts.ClockHand());
    hand.stroke = am4core.color('#A7FF83'); // set the hand stroke color
    hand.fill = am4core.color('#A7FF83'); // set the hand fill color
    // hand.value = +breakeven;

    // Create score label
    const scoreLabel = chart.createChild(am4core.Label);
    scoreLabel.text = +breakeven;
    scoreLabel.fontSize = 30;
    scoreLabel.align = 'center';
    scoreLabel.valign = 'bottom';
    scoreLabel.dy = -20;

    if (breakeven >= 100) {
      hand.value = 100;
      scoreLabel.text = `${100}+`;
    } else if (breakeven < 0) {
      hand.value = -0;
    } else {
      hand.value = Math.round(+breakeven);
    }

    // Attach the ready event handle
    chart.events.once('ready', () => {
      // Export the chart as an SVG string
      const svgString1 = chart.exporting.getImage('svg');
      svgString1.then((res) => {
        setScoreChart({ modalChart: res });
      });
    });

    return () => {
      chart.dispose();
    };
  }, [breakeven, setScoreChart]);

  return (
    <div className={classes.gauge_parent}>
      <div ref={chartRef} className={classes.gauge} />
      <div>
        <img src={iBtn} alt="i_btn" />
      </div>
    </div>
  );
}

export default GaugeChart;
