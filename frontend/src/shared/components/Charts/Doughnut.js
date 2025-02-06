import React from "react";
import { Doughnut } from "react-chartjs-2";

// Register required Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

const default_fill_colors = [
	"rgba(255, 99, 132, 0.7)",
	"rgba(54, 162, 235, 0.7)",
	"rgba(255, 206, 86, 0.7)",
	"rgba(75, 192, 192, 0.7)",
	"rgba(153, 102, 255, 0.7)",
	"rgba(255, 159, 64, 0.7)",
];

const default_stoke_colors = [
	"rgba(255, 99, 132, 1)", // Border colors
	"rgba(54, 162, 235, 1)",
	"rgba(255, 206, 86, 1)",
	"rgba(75, 192, 192, 1)",
	"rgba(153, 102, 255, 1)",
	"rgba(255, 159, 64, 1)",
];

const DoughnutChart = (props) => {
	// Data for the chart
	const data = {
		labels: props.labels, // Categories
		datasets: [
			{
				data: props.data, // Values for each category
				backgroundColor: default_fill_colors.slice(
					0,
					props.labels.length
				),
				borderColor: default_stoke_colors.slice(0, props.labels.length),
				borderWidth: 1,
			},
		],
	};

	// Chart options
	const options = {
		maintainAspectRatio: false,
		// height: "30vh",
		responsive: true,
		cutout: "50%",
		plugins: {
			legend: {
				position: "top", // Position of the legend
			},
			tooltip: {
				enabled: true, // Show tooltips
			},
		},
	};

	return (
		<div style={{ height: props.height }}>
			<Doughnut data={data} options={options} />
		</div>
	);
};

export default DoughnutChart;
