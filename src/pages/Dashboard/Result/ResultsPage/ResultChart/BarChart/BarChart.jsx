import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {
  getStructureObject,
  filterCategory,
  getTabData,
  getDiffrenceToPeers,
} from '../../../../../../utlis/Helper';
import { useSelector } from 'react-redux';
// Apply the animated theme
am4core.useTheme(am4themes_animated);

const BarChart = ({ id }) => {
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  useEffect(() => {
    const demographicsObjects = getStructureObject(demographics);
    const budgetObjects = getStructureObject(budgets);
    const demographicsCategory = filterCategory(demographicsObjects);
    const budgetCategory = filterCategory(budgetObjects);
    getTabData(demographicsCategory, budgetCategory);
    const difference = getDiffrenceToPeers(demographicsCategory);
    console.log('difference', difference);

    // Create chart instance
    const chart = am4core.create(id, am4charts.XYChart);

    // Add data
    chart.data = difference.splice(0, 5);
    // chart.data = [
    //   { category: 'Category 1', difference: 10 },
    //   { category: 'Category 2', difference: 20 },
    //   { category: 'Category 3', difference: 15 },
    //   { category: 'Category 4', difference: 12 },
    //   { category: 'Category 5', difference: 10 },
    //   { category: 'Category 6', difference: 12 },
    //   // Add more data points as needed
    // ];

    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.inversed = true; // Invert the axis to make it horizontal
    categoryAxis.title.text = '';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.labels.template.dy = -10; // Adjust the vertical position of the label
    categoryAxis.renderer.labels.template.disabled = true; // Disable category labels
    categoryAxis.renderer.minGridDistance = 5;

    // Adjust the renderer to increase the distance between categories
    categoryAxis.renderer.cellStartLocation = 0.4; // Change this value as needed
    categoryAxis.renderer.cellEndLocation = 1; // Change this value as needed

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Difference';

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = 'difference';
    series.dataFields.categoryY = 'category';
    series.name = 'difference';
    series.columns.template.tooltipText = '{name}: [bold]${valueX}[/]';

    // Adjust column width to increase the distance between bars
    series.columns.template.columnWidth = 40; // Change this value as needed

    // Add label bullet
    const labelBullet1 = series.bullets.push(new am4charts.LabelBullet());
    labelBullet1.label.text = '{categoryY}';
    labelBullet1.label.dx = -5;
    labelBullet1.label.dy = -20;
    // Adjust the vertical position of the label
    labelBullet1.label.fontSize = 12;
    labelBullet1.label.horizontalCenter = 'right';
    labelBullet1.label.verticalCenter = 'middle';

    const labelBullet2 = series.bullets.push(new am4charts.LabelBullet());
    labelBullet2.label.text = '${valueX}';
    labelBullet2.label.dx = 10; // Adjust the vertical position of the label
    labelBullet2.label.fontSize = 12;
    labelBullet2.label.horizontalCenter = 'left';

    // Add value labels inside each bar
    series.columns.template.adapter.add('text', (text, target) => {
      const value = target.dataItem && target.dataItem.valueX;
      if (difference && difference > 0) {
        return (Math.round(difference / 1000) * 1000).toString(); // Change the value formatting as needed
      }
      return text;
    });
    series.columns.template.adapter.add('textY', (textY, target) => {
      return -series.columns.template.height / 2;
    });

    // Cleanup on component unmount
    return () => {
      chart.dispose();
    };
  }, []);

  return <div id={id} style={{ width: '100%', height: '350px' }}></div>;
};

export default BarChart;
