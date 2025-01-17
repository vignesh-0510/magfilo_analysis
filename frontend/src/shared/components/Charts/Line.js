import React from "react";
import { Line } from "react-chartjs-2";

// Register required Chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const default_fill_colors = [
	"rgba(255, 99, 132, 0.7)",
	"rgba(54, 162, 235, 0.7)",
	"rgba(255, 206, 86, 0.7)",
	"rgba(75, 192, 192, 0.7)",
	"rgba(153, 102, 255, 0.7)",
	"rgba(255, 159, 64, 0.7)",
];

const default_stroke_colors = [
	"rgba(255, 99, 132, 1)", // Border colors
	"rgba(54, 162, 235, 1)",
	"rgba(255, 206, 86, 1)",
	"rgba(75, 192, 192, 1)",
	"rgba(153, 102, 255, 1)",
	"rgba(255, 159, 64, 1)",
];

const MultipleLineChart = (props) => {
	const create_dataset = (annot_data, domain_labels) => {
		const dataset = [];
		annot_data.forEach((d, idx) => {
			dataset.push({
				label: domain_labels[idx],
				data: d,
				backgroundColor: default_fill_colors[idx],
				borderColor: default_stroke_colors[idx],
				borderWidth: 2,
				fill: "start",
				tension: 0.2,
			});
		});

		return dataset;
	};

	// Data for the chart
	const line_data = {
		labels: props.labels, // Year Labels
		datasets: create_dataset(props.category_data, props.domain_labels),
	};

	// Chart options
	const options = {
		maintainAspectRatio: false,
		// width: 400,
		responsive: true,
		plugins: {
			legend: {
				position: "top", // Position of the legend
			},
			tooltip: {
				enabled: true, // Show tooltips
			},
		},
		scales: {
			x: { beginAtZero: true },
		},
	};

	return <Line data={line_data} options={options} />;
};

export default MultipleLineChart;
