import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useSelector } from 'react-redux';
am4core.useTheme(am4themes_animated);

const DonutChart = ({ id }) => {
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  //   const bugetData = [...budgets.transformed];
  console.log('budgets', budgets);

  useEffect(() => {
    // Create chart instance
    const chart = am4core.create(id, am4charts.PieChart);

    // Add data
    chart.data = [
      { category: 'Category 1', value: 6 },
      { category: 'Category 2', value: 2 },
      { category: 'Category 3', value: 1 },
      { category: 'Category 4', value: 1 },
      { category: 'Category 5', value: 20 },
      { category: 'Category 6', value: 1 },
      { category: 'Category 7', value: 2 },
      { category: 'Category 8', value: 1 },
      { category: 'Category 9', value: 20 },
    ];

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

    // Clean up on unmount
    return () => {
      chart.dispose();
    };
  }, []);

  return <div id={id} style={{ width: '100%', height: '400px' }}></div>;
};

export default DonutChart;
