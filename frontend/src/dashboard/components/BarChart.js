import React, { useState, useEffect } from "react";

import MultipleBarChart from "../../shared/components/Charts/Bar";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const url = `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/fetch_hemisphere_statistics`;

const MultiBarChart = (props) => {
	const { isLoading, sendRequest } = useHttpClient();
	const [hemisphereLabels, setHemisphereLabels] = useState([]);
	const [catLabels, setCatLabels] = useState([]);
	const [hemisphereData, setHemisphereData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseData = await sendRequest(url, "GET");

				setHemisphereLabels((state) => responseData["hemisphere"]);
				setCatLabels((state) => responseData["chirality"]);
				setHemisphereData((state) => responseData.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [sendRequest]);
	return (
		<div style={{ height: props.height }}>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<MultipleBarChart
					labels={hemisphereLabels}
					domain_labels={catLabels}
					category_data={hemisphereData}
					height={props.height}
				/>
			)}
		</div>
	);
};

export default MultiBarChart;
