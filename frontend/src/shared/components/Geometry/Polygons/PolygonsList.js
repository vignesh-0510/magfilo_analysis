import React from "react";

// import classes from "./PolygonsList.module.css";
import PolygonItem from "./PolygonItem";

const PolygonsList = (props) => {
	const fetch_geometry = () => {
		if (props.buffer === "") {
			return props.geometry;
		}
		return `${props.geometry}_buffer`;
	};
	return (
		<>
			{props.annotations.map((polygon) => (
				<PolygonItem
					key={polygon.id}
					id={polygon.id}
					annot={polygon}
					scale={props.scale}
					geometry={props.geometry || "bbox"}
				/>
			))}
		</>
	);
};

export default PolygonsList;
