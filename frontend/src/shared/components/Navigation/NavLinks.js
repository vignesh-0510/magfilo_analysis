import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
	const authCtx = useContext(AuthContext);

	const logoutHandler = () => {
		authCtx.logout();
	};
	return (
		<>
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
				<li className="nav-item">
					<NavLink
						className="nav-link active"
						aria-current="page"
						to="/about"
					>
						About
					</NavLink>
				</li>
				{authCtx.isLoggedIn && (
					<li className="nav-item">
						<NavLink className="nav-link" to="/dashboard">
							Dashboard
						</NavLink>
					</li>
				)}
			</ul>

			<span className="nav-links">
				{!authCtx.isLoggedIn && (
					<li className="btn btn-outline-success">
						<NavLink
							style={{ textDecoration: "none", color: "inherit" }}
							to="/authenticate"
						>
							AUTHENTICATE
						</NavLink>
					</li>
				)}
				{authCtx.isLoggedIn && (
					<li className="btn btn-outline-danger">
						<Link
							to="/"
							onClick={logoutHandler}
							style={{ textDecoration: "none", color: "inherit" }}
						>
							LOGOUT
						</Link>
					</li>
				)}
			</span>
		</>
	);
};

export default NavLinks;
