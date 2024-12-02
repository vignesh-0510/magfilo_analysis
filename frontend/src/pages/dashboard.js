import React from "react";

// import DisplayImage from "../shared/components/UIElements/DisplayImage";
import MultiBarChart from "../dashboard/components/BarChart";
import MultiLineChart from "../dashboard/components/LineChart";
import CategoriesChart from "../dashboard/components/CategoriesChart";
import SideMenu from "../dashboard/components/SideMenu";
import {
	Chart as ChartJS,
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	Filler,
} from "chart.js";

ChartJS.register(
	BarElement,
	ArcElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Filler,
	Legend
);
const Dashboard = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-3 p-0">
					<SideMenu />
				</div>
				<div className="col-9">
					<h1 className="display-5">Dashboard</h1>
					{/* <DisplayImage
						image={{
							url: "https://gong2.nso.edu/HA/hag/201410/20141001/20141001195834Ch.jpg",
							width: "512px",
							height: "auto",
						}}
					/> */}
					<div className="container-fluid">
						<div className="row justify-content-between">
							<div
								className="col-md-7 card shadow-sm me-2"
								style={{ maxHeight: "40vh" }}
							>
								<MultiBarChart height="90%" />
								<div className="card-body">
									<p className="card-subtitle text-center text-secondary">
										Plot showing chirality distribution of
										filaments in the two hemispheres.
									</p>
								</div>
							</div>
							<div
								className="col-md-4 card shadow-sm ms-2 ps-5 justify-content-center "
								style={{ minWidth: "40%", maxHeight: "40vh" }}
							>
								<CategoriesChart height="90%" />
								<div className="card-body">
									<p className="card-subtitle text-center text-secondary">
										Chirality distribution of filaments.
									</p>
								</div>
							</div>
						</div>
						<div className="row mt-3 justify-content-around">
							<div className="col-md-12 card shadow-sm mx-4">
								<MultiLineChart />
							</div>
							{/* <div className="col-md-4 card shadow-sm ms-2">
								<div className="card-body">
									xcx
									<p className="card-subtitle text-center text-secondary">
										Plot showing Chirality distribution of
										filaments.
									</p>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
