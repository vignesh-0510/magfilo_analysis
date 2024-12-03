import React, { useState, useEffect } from "react";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import PolygonsList from "../Geometry/Polygons/PolygonsList";
import LinesList from "../Geometry/Lines/LinesList";
import classes from "./DisplayImage.module.css";

const o_height = 2048;
const o_width = 2048;

const DisplayBuffer = (props) => {
	const h_scale = (props.image.height ? props.image.height : 0.5) / o_height;
	const w_scale = (props.image.width ? props.image.width : 0.5) / o_width;
	const { isLoading, sendRequest } = useHttpClient();
	const [annotations, setAnnotations] = useState([]);
	const bufferDistance = props.buffer;
	useEffect(() => {
		const fetchData = async (bufferDistance) => {
			try {
				const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/annotations/buffer/${bufferDistance}`;
				const responseData = await sendRequest(backend_url, "GET");
				const data = [];
				console.log(responseData);

				responseData.forEach((element) => {
					data.push(element);
				});
				setAnnotations(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData(bufferDistance);
	}, [sendRequest, props.image, bufferDistance]);

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
								geometry={
									`${props.geometry}_buffer` || "bbox_buffer"
								}
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

export default DisplayBuffer;
