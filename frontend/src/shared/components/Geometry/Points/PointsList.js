import React from "react";

import classes from "./PointsList.module.css";
import PointItem from "./PointItem";

const PointsList = (props) => {
	return (
		<>
			{props.points.map((point) => (
				<PointItem
					key={point.id}
					id={id}
					category={category}
					point={point}
				/>
			))}
		</>
	);
};

export default PointsList;
