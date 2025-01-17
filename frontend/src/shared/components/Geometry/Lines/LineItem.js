import React, { useState } from "react";

// import classes from "./LineItem.module.css";
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

const LineItem = (props) => {
	const [isHovered, setIsHovered] = useState(false);
	const { w_scale, h_scale } = props.scale;
	const fetch_svg_line_string = (line_string) => {
		const line_arr = line_string
			.substring(12, line_string.length - 1)
			.split(", ");

		let ret_string = "";
		line_arr.forEach((point) => {
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

	const handleLineClick = () => {
		return "ff";
	};

	const handleLineHover = () => {
		setIsHovered(true);
	};

	const handleLineOut = () => {
		setIsHovered(false);
	};
	return (
		<polyline
			className="polygon"
			points={fetch_svg_line_string(props.annot["spine"])}
			fill={`${color_dict[props.annot.category]}`}
			fillOpacity={isHovered ? "0.7" : "0.2"}
			stroke={color_dict[props.annot.category]}
			strokeWidth="2"
			strokeLinejoin="round"
			onClick={handleLineClick}
			onMouseOver={handleLineHover}
			onMouseOut={handleLineOut}
		/>
	);
};

export default LineItem;
