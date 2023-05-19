import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// Apply the animated theme
am4core.useTheme(am4themes_animated);

const BarChart = () => {
    useEffect(() => {
        // Create chart instance
        const chart = am4core.create('chartdiv', am4charts.XYChart);

        // Add data
        chart.data = [
            { category: 'Category 1', value: 10 },
            { category: 'Category 2', value: 20 },
            { category: 'Category 3', value: 15 },
            // Add more data points as needed
        ];

        // Create axes
        const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'category';
        categoryAxis.renderer.inversed = true; // Invert the axis to make it horizontal
        categoryAxis.title.text = '';
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.labels.template.dy = -10; // Adjust the vertical position of the label
        categoryAxis.renderer.labels.template.disabled = true; // Disable category labels

        const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = 'Value';

        // Create series
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = 'value';
        series.dataFields.categoryY = 'category';
        series.name = 'Value';
        series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]';

        // Add value labels inside each bar
        series.columns.template.adapter.add('text', (text, target) => {
            const value = target.dataItem && target.dataItem.valueX;
            if (value && value > 0) {
                return (Math.round(value / 1000) * 1000).toString(); // Change the value formatting as needed
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

    return <div id="chartdiv" style={{ width: '100%', height: '250px', padding: "0px 15px" }}></div>;
};

export default BarChart;
