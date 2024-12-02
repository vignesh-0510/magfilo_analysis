import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import DoughnutChart from "../../shared/components/Charts/Doughnut";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const url = `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/fetch_chirality_statistics`;
const CategoriesChart = (props) => {
	const { isLoading, sendRequest } = useHttpClient();
	const [catLabels, setCatLabels] = useState([]);
	const [catData, setCatData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseData = await sendRequest(url, "GET");

				// Extract categories and counts
				const labels = [];
				const data = [];
				responseData.forEach((element) => {
					labels.push(element["category"]);
					data.push(element["count"]);
				});

				// Update state
				setCatLabels(labels);
				setCatData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [sendRequest]);
	return (
		<>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<DoughnutChart
					labels={catLabels}
					data={catData}
					height={props.height}
				/>
			)}
		</>
	);
};

export default CategoriesChart;
