import React, { useRef, useState, useEffect } from "react";

import classes from "./specificDate.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import DisplayImage from "../../shared/components/UIElements/DisplayImage";
import SideMenu from "../../dashboard/components/SideMenu";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const fetch_datetime_string = (input_date, input_time) => {
	return `${input_date} ${input_time}`;
};
const SpecificDate = () => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/api/queries/date_captured`;
	const [imageData, setImageData] = useState(null);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const dateOfCaptureRef = useRef();
	const timeOfCaptureRef = useRef();
	const { isLoading, sendRequest } = useHttpClient();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const fetchData = async (url, datetime_string) => {
			let img_data = {
				width: 750,
				height: 750,
			};

			try {
				const responseData = await sendRequest(
					`${url}/${encodeURIComponent(datetime_string)}`,
					"GET"
				);

				img_data = {
					...img_data,
					...responseData["data"],
				};

				// Update state
				setImageData(img_data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		const datetime_string = fetch_datetime_string(
			dateOfCaptureRef.current.value,
			timeOfCaptureRef.current.value
		);
		fetchData(url, datetime_string);
		setIsFormSubmitted(true);
		// setShowForm(false);
	};

	useEffect(() => {
		if (isFormSubmitted) {
			setIsFormSubmitted(false);
		}
	}, [isFormSubmitted]);
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-3 p-0">
					<SideMenu />
				</div>
				<div className="col-9 justify-content-center">
					<form
						method="POST"
						onSubmit={handleFormSubmit}
						className="row gy-2 gx-3 my-2 align-items-center justify-content-center"
					>
						<div className={`${classes["form-row"]} col-auto`}>
							<label htmlFor="date_of_capture">
								Date of capture
							</label>
							<input
								type="date"
								className="form-control"
								id="date_of_capture"
								placeholder="01/12/2024"
								required
								ref={dateOfCaptureRef}
							/>
						</div>
						<div className={`${classes["form-row"]} col-auto`}>
							<label htmlFor="time_of_capture">Time</label>
							<input
								type="time"
								step="1"
								className="form-control"
								id="time_of_capture"
								placeholder="00:00"
								ref={timeOfCaptureRef}
							/>
						</div>
						<div className="col-auto">
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
					</form>

					{isLoading && <LoadingSpinner />}
					{!isLoading && imageData && (
						<DisplayImage image={imageData} />
					)}
				</div>
			</div>
		</div>
	);
};

export default SpecificDate;
