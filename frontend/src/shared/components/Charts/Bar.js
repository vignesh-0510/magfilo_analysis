import React from "react";
import { Bar } from "react-chartjs-2";

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

const MultipleBarChart = (props) => {
	const create_dataset = (annot_data) => {
		const dataset = [];
		annot_data.forEach((d, idx) => {
			dataset.push({
				label: props.domain_labels[idx],
				data: d,
				backgroundColor: default_fill_colors[idx],
				borderColor: default_stroke_colors[idx],
				borderWidth: 1,
			});
		});

		return dataset;
	};

	// Data for the chart
	const bar_data = {
		labels: props.labels, // Categories
		datasets: create_dataset(props.category_data),
	};

	// Chart options
	const options = {
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
			y: { beginAtZero: true },
		},
	};

	return <Bar data={bar_data} options={options} />;
};

export default MultipleBarChart;
