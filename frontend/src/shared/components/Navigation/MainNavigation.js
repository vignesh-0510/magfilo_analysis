import React from "react";

import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						MAGFilOv1.0 Data Analysis Tool
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse ms-2"
						id="navbarText"
					>
						<NavLinks />
					</div>
				</div>
			</nav>
		</>
	);
};

export default MainNavigation;
