import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import HomePage from "./pages/homepage";
import AboutPage from "./pages/aboutpage";
import Auth from "./users/pages/Auth";
import Dashboard from "./pages/dashboard";
import Footer from "./shared/components/Navigation/Footer";
import SpecificDate from "./pages/Queries/specificDate";
import AllDates from "./pages/Queries/allDates";
import FilterChirality from "./pages/Queries/filter";
import Buffer from "./pages/Queries/buffer";
import NotFoundPage from "./pages/notfoundpage";
// import NotFoundPage from "./views/notfoundpage";

const App = () => {
	const { token, userId, login, logout } = useAuth();

	let routes;
	if (!token) {
		routes = (
			<Routes>
				<Route path="/" element={<HomePage />} exact="true" />
				<Route path="/about" element={<AboutPage />} exact="true" />
				<Route path="/authenticate" element={<Auth />} exact="true" />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path="/" element={<HomePage />} exact="true" />
				<Route path="/about" element={<AboutPage />} exact="true" />
				<Route path="/dashboard" element={<Dashboard />} exact="true" />
				<Route path="/query" element={<SpecificDate />} exact="true" />
				<Route
					path="/filter"
					element={<FilterChirality />}
					exact="true"
				/>
				<Route path="/buffer" element={<Buffer />} exact="true" />
				<Route path="/area" element={<NotFoundPage />} exact="true" />
				<Route path="/length" element={<NotFoundPage />} exact="true" />
				<Route path="/change" element={<NotFoundPage />} exact="true" />
				<Route path="/range" element={<NotFoundPage />} exact="true" />
				<Route
					path="/allannotations"
					element={<AllDates />}
					exact="true"
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<MainNavigation />
				<main>
					<Suspense
						fallback={
							<div>
								<LoadingSpinner />
							</div>
						}
					>
						{routes}
					</Suspense>
				</main>
				<Footer />
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
