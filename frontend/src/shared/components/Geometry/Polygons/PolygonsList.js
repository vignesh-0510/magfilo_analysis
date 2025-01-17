import React from "react";

// import classes from "./PolygonsList.module.css";
import PolygonItem from "./PolygonItem";

const PolygonsList = (props) => {
	return (
		<>
			{props.annotations.map((polygon) => (
				<PolygonItem
					key={polygon.id}
					id={polygon.id}
					annot={polygon}
					scale={props.scale}
					geometry={props.geometry || "bbox"}
					onPolygonClick={props.onPolygonClick}
				/>
			))}
		</>
	);
};

export default PolygonsList;
