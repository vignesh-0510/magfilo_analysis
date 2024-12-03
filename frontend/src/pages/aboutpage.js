import React from "react";

import classes from "./aboutpage.module.css";

const AboutPage = () => {
	return (
		<>
			<div className={`${classes["backImage"]}`}>
				<section className={`container ${classes["hero"]} pt-5`}>
					<div className="container">
						<h2 className="display-4 lead">About this Project</h2>
						<div className="row">
							<p className="col-12">
								This project is an extension of the work carried
								out in the project '
								<em>
									A dataset of manually annotated filaments
									from H-alpha observations
								</em>
								' by Azim Ahmadzadeh, Rohan Adhyapak, Kartik
								Chaurasiya, Laxmi Alekhya Nagubandi, V. Aparna,
								Petrus C. Martens, Alexei Pevtsov, Luca
								Bertello, Alexander Pevtsov, Naomi Douglas,
								Samuel McDonald, Apaar Bawa, Eugene Kang, Riley
								Wu, Dustin J. Kempton, Aya Abdelkarem, Patrick
								M. Copeland & Sri Harsha Seelamneni.
							</p>

							<h6 className={`display-6`}>Papers and Data</h6>
							<p
								className={`col-12 ${classes["data-reference"]}`}
							>
								The Papers and code repository for original
								paper can be found at
								<ul>
									<li>
										<a
											href="https://www.nature.com/articles/s41597-024-03876-y"
											target="_blank"
											rel="noreferrer"
										>
											Paper
										</a>
									</li>
									<li>
										<a
											href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/J6JNVK"
											target="_blank"
											rel="noreferrer"
										>
											Code
										</a>
									</li>
								</ul>
							</p>
							<p className="col-12">
								This project aims to serve as a analysis toolkit
								for the MAGFilOv1.0 dataset created as part of
								the aforementioned project. This Project
								migrated the dataset from JSON based COCO-style
								format to PostgreSQL and uses PostGIS for
								spatial objects
							</p>

							<h6 className={`display-6`}>Group Members</h6>
							<p className={`col-12 ${classes["group-members"]}`}>
								The Papers and code repository for this code can
								be found at
								<ul>
									<li>S. Vignesh</li>
									<li>Pranjal</li>
									<li>Asrith</li>
									<li>Victor</li>
									<li>Shoaib</li>
								</ul>
							</p>
						</div>
					</div>
				</section>
			</div>
			{/* <Footer /> */}
		</>
	);
};

export default AboutPage;
