import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import useFormContext from '../../../hooks/useFormContext';
am4core.useTheme(am4themes_animated);

const DonutChart = ({ id, data }) => {
  const { setChartSvg } = useFormContext();
  useEffect(() => {
    // Create chart instance
    const chart = am4core.create(id, am4charts.PieChart);
    // Add data
    chart.data = data && data;

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure series
    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'category';
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;

    // Set gradient colors
    series.colors.list = [
      am4core.color('#3ab7a4'),
      am4core.color('#5e5ca9'),
      am4core.color('#D45159'),
      am4core.color('#f15a24'),
      am4core.color('#68ACA5'),
      am4core.color('#8c2b86'),
      am4core.color('#73c03c'),
      am4core.color('#ffb31f'),
      am4core.color('#68ACA5'),
    ];

    // Add slice label
    const label = series.createChild(am4core.Label);
    label.text = '100%';
    label.fontSize = 30;
    label.fontWeight = 'bold';
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'middle';

    // Disable watermark
    chart.logo.disabled = true;

    // Adjust animation duration
    chart.responsive.enabled = true;
    chart.responsive.useDefault = false;
    chart.responsive.animationEasing = am4core.ease.sinOut;
    chart.responsive.animationDuration = 0;

    chart.hiddenState.properties.opacity = 1;
    chart.hiddenState.properties.visible = true;

    // Attach the ready event handle
    chart.events.once('ready', () => {
      // Export the chart as an SVG string
      const svgString1 = chart.exporting.getImage('png');
      svgString1.then((res) => {
        setChartSvg((prev) => {
          if (prev.length > 2) {
            prev = [];
          }
          return [...prev, res];
        });
      });
    });

    // Clean up on unmount
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id={id} style={{ width: '100%', height: '400px' }}></div>;
};

export default DonutChart;
