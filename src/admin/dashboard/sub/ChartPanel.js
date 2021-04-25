import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles({

});

function chartData () {
	return {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				fillColor: 'rgba(220,220,220,0.2)',
				strokeColor: 'rgba(220,220,220,1)',
				pointColor: 'rgba(220,220,220,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: [65, 59, 80, 81, 56, 55, 40],
			}
		]
	};
}

const options = {
	scaleShowGridLines: true,
	scaleGridLineColor: 'rgba(0,0,0,.05)',
	scaleGridLineWidth: 1,
	scaleShowHorizontalLines: true,
	scaleShowVerticalLines: true,
	bezierCurve: true,
	bezierCurveTension: 0.4,
	pointDot: true,
	pointDotRadius: 4,
	pointDotStrokeWidth: 1,
	pointHitDetectionRadius: 20,
	datasetStroke: true,
	datasetStrokeWidth: 2,
	datasetFill: true,
	legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
};

export default function ChartPanel (props) {

	const chartRef = useRef();

	useEffect(() => {
		const chart = new Chart(chartRef.current, {
			type: 'line',
			options: options,
			data: chartData()
		});
		chartRef.current = chart;
	}, []);

	return (
		<canvas ref={chartRef} width="400" height="100"/>
	);
}
