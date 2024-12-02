import React, { useState, useEffect } from "react";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import PolygonsList from "../Geometry/Polygons/PolygonsList";
import classes from "./DisplayImage.module.css";

const o_height = 2048;
const o_width = 2048;

// const url = `${process.env.REACT_APP_BACKEND_URL}/api/annotations`;
const DisplayImage = (props) => {
	const h_scale = (props.image.height ? props.image.height : 0.5) / o_height;
	const w_scale = (props.image.width ? props.image.width : 0.5) / o_width;
	const { isLoading, sendRequest } = useHttpClient();
	const [annotations, setAnnotations] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/queries/image_id/${props.image.image_id}`;
				const responseData = await sendRequest(backend_url, "GET");
				const data = [];
				responseData.forEach((element) => {
					data.push(element);
				});
				setAnnotations(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [sendRequest, props.image]);

	// Toggle selection state when the polygon is clicked
	const handlePolygonClick = () => {
		console.log("clicked");
	};
	return (
		<div className="container-fluid">
			<div className="row justify-content-center d-flex">
				{isLoading && <LoadingSpinner />}
				{!isLoading && (
					<div className={classes["image-container"]}>
						<img
							src={props.image.url}
							alt="scaled_image"
							width={`${props.image.width}px`}
							height={`${props.image.width}px`}
							className={classes["sun_image"]}
						/>
						<svg className="svg">
							<PolygonsList
								annotations={annotations}
								scale={{ w_scale, h_scale }}
								onClick={handlePolygonClick}
							/>
						</svg>
					</div>
				)}
			</div>
		</div>
	);
};

export default DisplayImage;
