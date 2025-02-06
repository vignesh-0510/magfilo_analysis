import React, { useState } from "react";

// import classes from "./PolygonItem.module.css";
const default_fill_colors = [
	"rgb(255, 99, 132)",
	"rgb(54, 162, 235)",
	"rgb(255, 206, 86)",
	"rgb(75, 192, 192)",
	"rgb(153, 102, 255)",
	"rgb(255, 159, 64)",
];
const color_dict = {
	Left: default_fill_colors[0],
	Right: default_fill_colors[1],
	Unidentifiable: default_fill_colors[2],
};
const PolygonItem = (props) => {
	const [isHovered, setIsHovered] = useState(false);
	const { w_scale, h_scale } = props.scale;
	const fetch_svg_polygon_string = (polygon_string) => {
		const poly_arr = polygon_string
			.substring(10, polygon_string.length - 2)
			.split(", ");

		let ret_string = "";
		poly_arr.forEach((point) => {
			const point_arr = point.split(" ");

			point_arr.forEach((coord, idx) => {
				if (idx === 0) {
					const scaled_coord = w_scale * coord;
					ret_string += scaled_coord + ",";
				} else {
					const scaled_coord = h_scale * coord;
					ret_string += scaled_coord + " ";
				}
			});
		});

		return ret_string;
	};

	const handlePolygonClick = () => {
		if (props.onPolygonClick) {
			props.onPolygonClick(props.id);
		}
	};

	const handlePolygonHover = () => {
		setIsHovered(true);
	};

	const handlePolygonOut = () => {
		setIsHovered(false);
	};
	return (
		<a
			href="#offcanvas"
			role="button"
			// aria-controls="offcanvasExample"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvas"
			// onClick={handlePolygonClick}
		>
			<polygon
				className="polygon"
				points={fetch_svg_polygon_string(props.annot[props.geometry])}
				fill={`${color_dict[props.annot.category]}`}
				fillOpacity={isHovered ? "0.8" : "0.3"}
				stroke={color_dict[props.annot.category]}
				strokeOpacity={isHovered ? "0.8" : "0.3"}
				strokeWidth="2"
				strokeLinejoin="round"
				onMouseOver={handlePolygonHover}
				onMouseOut={handlePolygonOut}
				onClick={handlePolygonClick}
			/>
		</a>
	);
};

export default PolygonItem;
