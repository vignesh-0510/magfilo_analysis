import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
	return (
		<footer className={`${classes["footer"]}`}>
			<p>© 2024 Solar Filament Analysis. All rights released.</p>
			<p>Contact: not_us@spatial_databases.com</p>
		</footer>
	);
};

export default Footer;
