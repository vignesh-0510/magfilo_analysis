import React, { useRef, useState, useEffect } from "react";

import classes from "./allDates.module.css";
import DisplayAnnotations from "../../shared/components/UIElements/DisplayAnnotations";
import SideMenu from "../../dashboard/components/SideMenu";
const AllDates = () => {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const inputGeometryRef = useRef();
	const [inputGeometry, setInputGeometry] = useState(null);
	const handleFormSubmit = (e) => {
		e.preventDefault();
		setInputGeometry(inputGeometryRef.current.value);
		setIsFormSubmitted(true);
		// setShowForm(false);
	};

	useEffect(() => {
		if (isFormSubmitted) {
		}
		setIsFormSubmitted(false);
	}, [isFormSubmitted]);
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-3 p-0">
					<SideMenu />
				</div>
				<div className="col-9 justify-content-center">
					{
						<form
							method="POST"
							onSubmit={handleFormSubmit}
							className="row gy-2 gx-3 my-2 align-items-center justify-content-center"
						>
							<div className={`${classes["form-row"]} col-auto`}>
								<select
									className="form-select"
									name="geometry_type"
									id="geometry_type"
									ref={inputGeometryRef}
								>
									<option value="segmentation">
										Segmentation
									</option>
									<option value="bbox" selected>
										Bounding Box
									</option>
									<option value="spine">Spine</option>
								</select>
							</div>

							<div className="col-auto">
								<button
									type="submit"
									className="btn btn-primary"
								>
									Submit
								</button>
							</div>
						</form>
					}
					{/* {!isFormSubmitted && <LoadingSpinner />} */}
					{
						<DisplayAnnotations
							image={{
								height: 750,
								width: 750,
								url: "https://gong2.nso.edu/HA/hag/201207/20120715/20120715123434Ch.jpg",
								image_id: "050103-20120715123434Ch",
							}}
							geometry={inputGeometry}
						/>
					}
				</div>
			</div>
		</div>
	);
};

export default AllDates;
