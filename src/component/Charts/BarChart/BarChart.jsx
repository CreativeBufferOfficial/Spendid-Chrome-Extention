import React, { useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {
  getStructureObject,
  filterCategory,
  getTabData,
  getDifferenceToPeers,
} from '../../../utlis/Helper';
import { useSelector } from 'react-redux';
import useFormContext from '../../../hooks/useFormContext';
// Apply the animated theme
am4core.useTheme(am4themes_animated);

const BarChart = ({ id }) => {
  const { setBarChart, categoryInputHandler } = useFormContext();
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  const { lendings } = useSelector((state) => state.lending);
  const [savingsSet, setSavingsSet] = useState(false);

  useEffect(() => {
    // init();
    let diff;
    if (demographics && budgets) {
      const demographicsObjects = getStructureObject(demographics);
      const budgetObjects = getStructureObject(budgets);
      const demographicsCategory = filterCategory(demographicsObjects);
      const budgetCategory = filterCategory(budgetObjects);
      getTabData(demographicsCategory, budgetCategory);
      diff = getDifferenceToPeers(demographicsCategory);
    }
    // Create chart instance
    const chart = am4core.create(id, am4charts.XYChart);

    // Add data
    chart.data = diff && diff.splice(0, 5);

    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';

    categoryAxis.numberFormatter.numberFormat = '$#,###';
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.9;
    categoryAxis.renderer.cellEndLocation = 0.7;
    categoryAxis.renderer.labels.template.rotation = 0;
    categoryAxis.renderer.labels.template.fill = am4core.color('#000');
    categoryAxis.renderer.labels.template.verticalTop = 'top';
    categoryAxis.renderer.labels.template.wrap = false;
    categoryAxis.renderer.labels.template.truncate = false;
    // categoryAxis.renderer.labels.template.maxWidth = 120;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.labels.template.valign = 'top';
    categoryAxis.renderer.labels.template.dy = -1;
    categoryAxis.renderer.labels.template.dx = -10;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Difference';
    valueAxis.renderer.labels.template.fontSize = 10;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = 'difference';
    series.dataFields.categoryY = 'category';
    series.name = 'difference';
    series.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
    // Set the color of the columns
    series.columns.template.fill = am4core.color('#0267e8');

    // Adjust column width to increase the distance between bars
    series.columns.template.columnWidth = 30; // Change this value as needed

    const labelBullet2 = series.bullets.push(new am4charts.LabelBullet());
    labelBullet2.label.text = '{valueX}';
    labelBullet2.label.dx = 5; // Adjust the vertical position of the label
    labelBullet2.label.fontSize = 12;
    labelBullet2.label.horizontalCenter = 'left';
    labelBullet2.label.fontSize = 13;
    labelBullet2.label.hideOversized = false;
    labelBullet2.label.truncate = false;

    series.columns.template.adapter.add('textY', (textY, target) => {
      return -series.columns.template.height / 2;
    });
    // Disable watermark
    chart.logo.disabled = true;

    // Adjust hiddenState properties for visibility
    chart.hiddenState.properties.opacity = 1;
    chart.hiddenState.properties.visible = true;

    // Attach the ready event handle
    chart.events.once('ready', () => {
      // Export the chart as an SVG string
      const svgString1 = chart.exporting.getImage('svg');
      svgString1.then((res) => {
        setBarChart(res);
      });
    });
    // Cleanup on component unmount
    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (lendings && lendings.elements && !savingsSet) {
      const savings = Math.round(lendings.elements.cash_excess / 12);
      categoryInputHandler('savings', savings);
      setSavingsSet(true);
    }
  }, [lendings, categoryInputHandler, savingsSet]);

  return <div id={id} style={{ width: '100%', height: '340px' }}></div>;
};

export default BarChart;
