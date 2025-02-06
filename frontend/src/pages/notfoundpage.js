import classes from "./notfound.module.css";
import SideMenu from "../dashboard/components/SideMenu";
const NotFoundPage = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-3 p-0">
					<SideMenu />
				</div>
				<div className="col-9">
					<div className="row justify-content-center">
						<div className="col-9">
							<img
								src="/static/images/pageUnderConstruction.png"
								alt="Page Under Construction"
								// height="0%"
								width="100%"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
