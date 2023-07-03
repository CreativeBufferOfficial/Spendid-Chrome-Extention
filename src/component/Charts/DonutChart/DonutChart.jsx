import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {
  filterSavings,
  getStructureObject,
  getTabData,
  filterCategory,
} from '../../../utlis/Helper';
import useFormContext from '../../../context/FormContext';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useSelector } from 'react-redux';
am4core.useTheme(am4themes_animated);

const DonutChart = ({ id, data, netAnnualIncome }) => {
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);

  // const { data } = useFormContext();
  // const { net_annual_income } = data.apiReq.demographics;
  // console.log('netAnnualIncome', netAnnualIncome);

  useEffect(() => {
    // const budgetObjects = getStructureObject(budgets);
    // const category = filterCategory(budgetObjects);

    // Create chart instance
    const chart = am4core.create(id, am4charts.PieChart);
    // Add data
    // console.log('DATACHART>>>>>>>>>> ', data);
    chart.data = data;
    // chart.data = [
    //   { name: 'category1', value: 1 },
    //   { name: 'category12', value: 10 },
    //   { name: 'category23', value: 25 },
    // ];

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure series
    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.name = 'name';
    series.dataFields.value = 'value';
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;

    // Set gradient colors
    series.colors.list = [
      am4core.color('#3ab7a4'),
      am4core.color('#5e5ca9'),
      am4core.color('#d45159'),
      am4core.color('#f15a24'),
      am4core.color('#68aca5'),
      am4core.color('#8c2b86'),
      am4core.color('#73c03c'),
      am4core.color('#ffb31f'),
      am4core.color('#68aca5'),
      am4core.color('#689fac'),
      am4core.color('#688aac'),
      am4core.color('#6876ac'),
      am4core.color('#6f68ac'),
      am4core.color('#8368ac'),
      am4core.color('#9768ac'),
      am4core.color('#ac68ac'),
      am4core.color('#ac6898'),
      am4core.color('#ac6883'),
      am4core.color('#ac686f'),
      am4core.color('#ac7568'),
      am4core.color('#ac8a68'),
      am4core.color('#ac9e68'),
      am4core.color('#a5ac68'),
      am4core.color('#91ac68'),
      am4core.color('#7dac68'),
      am4core.color('#68ac68'),
      am4core.color('#68ac7c'),
      am4core.color('#68ac91'),
    ];

    // Add slice label
    const label = series.createChild(am4core.Label);
    label.text = `$ ${Math.round(netAnnualIncome)}`;
    label.fontSize = 30;
    label.fontWeight = 'bold';
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'middle';

    // Disable watermark
    chart.logo.disabled = true;
    // Clean up on unmount
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id={id} style={{ width: '100%', height: '400px' }}></div>;
};

export default DonutChart;
