import React, { useState } from "react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import {
	Sidebar,
	Menu,
	MenuItem,
	SubMenu,
	menuClasses,
} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

const hexToRgba = (hex, alpha) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const themes = {
	light: {
		sidebar: {
			backgroundColor: "#ffffff",
			color: "#607489",
		},
		menu: {
			menuContent: "#fbfcfd",
			icon: "#0098e5",
			hover: {
				backgroundColor: "#c5e4ff",
				color: "#44596e",
			},
			disabled: {
				color: "#9fb6cf",
			},
		},
	},
	dark: {
		sidebar: {
			backgroundColor: "#0b2948",
			color: "#8ba1b7",
		},
		menu: {
			menuContent: "#082440",
			icon: "#59d0ff",
			hover: {
				backgroundColor: "#4780ba",
				color: "#000000",
			},
			disabled: {
				color: "#3e5e7e",
			},
		},
	},
};

const SideMenu = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);
	const [theme, setTheme] = useState("dark");
	const handleThemeToggle = (e) => {
		setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
	};
	const menuItemStyles = {
		root: {
			fontSize: "20rem",
			fontWeight: 600,
		},
		icon: {
			color: themes[theme].menu.icon,
			[`&.${menuClasses.disabled}`]: {
				color: themes[theme].menu.disabled.color,
			},
		},
		SubMenuExpandIcon: {
			color: "#b6b7b9",
		},
		subMenuContent: ({ level }) => ({
			backgroundColor: hexToRgba(
				themes[theme].menu.menuContent,
				collapsed ? 1 : 0.4
			),
		}),
		button: {
			[`&.${menuClasses.disabled}`]: {
				color: themes[theme].menu.disabled.color,
			},
			"&:hover": {
				backgroundColor: hexToRgba(
					themes[theme].menu.hover.backgroundColor,
					0
				),
				color: themes[theme].menu.hover.color,
			},
		},
		label: ({ open }) => ({
			fontWeight: open ? 600 : undefined,
		}),
	};

	return (
		<Sidebar
			collapsed={collapsed}
			toggled={toggled}
			onBackdropClick={() => setToggled(false)}
			image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
			breakPoint="md"
			backgroundColor={hexToRgba(
				themes[theme].sidebar.backgroundColor,
				1
			)}
			rootStyles={{
				color: themes[theme].sidebar.color,
			}}
			style={{ width: "initial", height: "100vh" }}
		>
			<Menu>
				<MenuItem component={<NavLink to="/dashboard" />}>
					<span className="me-2">
						<RiDashboardHorizontalLine />
					</span>
					DashBoard
				</MenuItem>
				<MenuItem component={<NavLink to="/query" />}>Queries</MenuItem>
				<SubMenu label="View Data">
					<MenuItem component={<NavLink to="/allannotations" />}>
						All Data
					</MenuItem>
					<MenuItem component={<NavLink to="/query" />}>
						Specific Date
					</MenuItem>
				</SubMenu>
				<SubMenu label="Analyse Filaments">
					<MenuItem> Filter</MenuItem>
					<MenuItem> Area </MenuItem>
					<MenuItem> Perimeter </MenuItem>
					<MenuItem> Range </MenuItem>
					<MenuItem> Buffer </MenuItem>
					<MenuItem> Change </MenuItem>
				</SubMenu>
			</Menu>
		</Sidebar>
	);
};

export default SideMenu;
