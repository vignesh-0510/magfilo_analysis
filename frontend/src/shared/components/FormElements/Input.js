import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";
import classes from "./Input.module.css";

const InputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE":
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators),
			};
		case "TOUCH":
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const [inputState, dispatch] = useReducer(InputReducer, {
		value: props.initialValue || "",
		isValid: props.initialValid || false,
		isTouched: false,
	});
	const { id, onInput } = props;
	const { value, isValid } = inputState;
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, isValid, value, onInput]);

	const changeHandler = (event) => {
		dispatch({
			type: "CHANGE",
			value: event.target.value,
			validators: props.validators,
		});
	};

	const touchHandler = (event) => {
		dispatch({ type: "TOUCH" });
	};

	const element =
		props.element === "input" ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		);

	return (
		<div
			className={`${classes["form-control"]} ${
				!inputState.isValid &&
				inputState.isTouched &&
				classes["form-control--invalid"]
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{!inputState.isValid && inputState.isTouched && (
				<p>{props.errorText}</p>
			)}
		</div>
	);
};

export default Input;
