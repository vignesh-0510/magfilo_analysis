import React, { useState, useEffect, useMemo } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import MultipleLineChart from "../../shared/components/Charts/Line";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const url = `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/fetch_yearwise_statistics`;
const MultiLineChart = () => {
	const { isLoading, sendRequest } = useHttpClient();
	const chiralityLabels = useMemo(
		() => ["Left", "Right", "Unidentifiable"],
		[]
	);
	const [yearLabels, setYearLabels] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseData = await sendRequest(url, "GET");

				// Extract categories and counts

				const data = [];
				setYearLabels(responseData["years"]);

				chiralityLabels.forEach((chirality) => {
					data.push(responseData["data"][chirality]["count"]);
				});
				setData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [sendRequest, chiralityLabels]);
	return (
		<div className="ps-5" style={{ width: "95%", minHeight: "40vh" }}>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<MultipleLineChart
					labels={yearLabels}
					domain_labels={chiralityLabels}
					category_data={data}
				/>
			)}
		</div>
	);
};

export default MultiLineChart;
