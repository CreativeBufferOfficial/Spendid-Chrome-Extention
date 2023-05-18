import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const DonutChart = () => {
    useEffect(() => {
        // Create chart instance
        const chart = am4core.create("chartdiv", am4charts.PieChart);

        // Set gradient colors
        chart.colors.list = [
            am4core.color("#003f5c"),
            am4core.color("#2f4b7c"),
            am4core.color("#665191"),
            am4core.color("#a05195"),
            am4core.color("#d45087"),
        ];

        // Add data
        chart.data = [
            { category: "Category 1", value: 35 },
            { category: "Category 2", value: 15 },
            { category: "Category 3", value: 10 },
            { category: "Category 4", value: 20 },
            { category: "Category 5", value: 20 },
        ];

        // Set inner radius
        chart.innerRadius = am4core.percent(40);

        // Add and configure series
        const series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "category";
        series.labels.template.disabled = true;
        series.ticks.template.disabled = true;

        // Add slice label
        const label = series.createChild(am4core.Label);
        label.text = "{value.percent.formatNumber('#.0')}%";
        label.fontSize = 12;
        label.fontWeight = "bold";
        label.align = "center";
        label.verticalCenter = "middle";

        // Clean up on unmount
        return () => {
            chart.dispose();
        };
    }, []);

    return <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>;
};

export default DonutChart;
