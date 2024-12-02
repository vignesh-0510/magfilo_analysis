import React from "react";

import classes from "./LinesList.module.css";
import LineItem from "./LineItem";

const LinesList = (props) => {
	return (
		<>
			{props.annotations.map((annot) => (
				<LineItem
					key={annot.id}
					annot={annot}
					scale={props.scale}
					geometry={"spine"}
				/>
			))}
		</>
	);
};

export default LinesList;
