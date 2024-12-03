import React from "react";

import classes from "./homepage.module.css";

const HomePage = () => {
	const features = [
		{
			title: "Statistical Analysis",
			description:
				"Process high-resolution solar magnetograms and identify filaments in real time.",
		},
		{
			title: "Interactive Visualizations",
			description:
				"Visualize solar data with overlays, zoom, and polygon annotations.",
		},
		{
			title: "Spatial Data Analysis",
			description:
				"Leverage machine learning to predict filament formation and evolution.",
		},
		{
			title: "Temporal Data Visualizations",
			description:
				"Leverage machine learning to predict filament formation and evolution.",
		},
	];
	return (
		<>
			<div className={`${classes["backImage"]}`}>
				<section className={`${classes["hero"]}`}>
					<h2 className="display-1">
						Exploratory Data Analysis of Solar Filaments
					</h2>
					<div className="container">
						<div className="row justify-content-center">
							<p className={`lead col-8`}>
								Application to explore, analyze and visualize
								solar images and filaments with complex
								spatio-temporal query capabilities for
								scientific purposes.
							</p>
						</div>
					</div>
				</section>
				<section
					id="features"
					className={`container-fluid ${classes["features"]}`}
				>
					<h2>Features</h2>
					<div className="container-fluid">
						<div className={`row ${classes["features-list"]}`}>
							{features.map((feature, index) => (
								<div
									key={index}
									className={`col-md-3 card ${classes["feature-card"]}`}
								>
									<h3>{feature.title}</h3>
									<p>{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
			{/* <Footer /> */}
		</>
	);
};

export default HomePage;
