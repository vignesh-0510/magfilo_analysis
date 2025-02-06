import React, { useState, useEffect } from "react";

import classes from "./Offcanvas.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";

const url = `${process.env.REACT_APP_BACKEND_URL}/api/queries/`;
const DisplayOffcanvas = (props) => {
	const { isLoading, sendRequest } = useHttpClient();
	const [data, setData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseData = await sendRequest(
					`${url}/${props.annotId}/info`,
					"GET"
				);
				setData(responseData["data"]);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [props.annotId, sendRequest]);

	return (
		<div
			className="offcanvas offcanvas-end"
			tabIndex="-1"
			data-bs-scroll="true"
			id="offcanvas"
			aria-labelledby="offcanvasWithBothOptionsLabel"
		>
			<div className="offcanvas-header">
				<h5 className="offcanvas-title" id="offcanvasExampleLabel">
					Filament Information
				</h5>
				<button
					type="button"
					className="btn-close text-reset"
					data-bs-dismiss="offcanvas"
					aria-label="Close"
					onClick={props.hideShowOffcampus}
				></button>
			</div>
			{isLoading && <LoadingSpinner />}
			{!isLoading && data && (
				<div className="offcanvas-body">
					<strong>ID</strong>: {props.annotId}
					<table className={classes["infoList"]}>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Chirality
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["category"]}
							</td>
						</tr>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Area_segmentation
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["area_segmentation"].toFixed(5)}
							</td>
						</tr>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Area_bbox
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["area_bbox"].toFixed(5)}
							</td>
						</tr>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Perimeter_segmentation
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["perimeter_segmentation"].toFixed(5)}
							</td>
						</tr>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Length_spine
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["length_spine"].toFixed(5)}
							</td>
						</tr>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Roundness_Ratio
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["roundness_ratio"].toFixed(6)}
							</td>
						</tr>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Curvyness_ratio
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["curvyness_ratio"].toFixed(6)}
							</td>
						</tr>
						<tr className={classes["infoListItem"]}>
							<td className={classes["infoListItem__key"]}>
								Aspect_ratio
							</td>

							<td className={classes["infoListItem__value"]}>
								{data["aspect_ratio"].toFixed(6)}
							</td>
						</tr>
					</table>
				</div>
			)}
		</div>
	);
};

export default DisplayOffcanvas;
