import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
	const content = (
		<div
			className={`${classes["modal"]} ${props.className}`}
			style={props.style}
		>
			<header
				className={`${classes["modal__header"]} ${props.headerClass}`}
			>
				<h2>{props.header}</h2>
			</header>
			<form
				onSubmit={
					props.onSubmit
						? props.onSubmit
						: (e) => {
								e.preventDefault();
						  }
				}
			></form>
			<div
				className={`${classes["modal__content"]} ${props.contentClass}`}
			>
				{props.children}
			</div>
			<footer
				className={`${classes["modal__footer"]} ${
					classes[props.footerClass]
				}`}
			>
				<h2>{props.footer}</h2>
			</footer>
		</div>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById("modal-hook")
	);
};

const Modal = (props) => {
	return (
		<>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames={{
					enter: classes["modal-enter"],
					enterActive: classes["modal-enter-active"],
					exit: classes["modal-exit"],
					exitActive: classes["modal-exit-active"],
				}}
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</>
	);
};

export default Modal;
