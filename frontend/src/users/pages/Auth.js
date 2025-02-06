import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import classes from "./Auth.module.css";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			user: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const formSubmitHandler = async (event) => {
		event.preventDefault();
		let responseData;
		if (formState.isFormValid) {
			try {
				responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/login`,
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						user: formState.inputs.user.value,
						password: formState.inputs.password.value,
					})
				);
				if (!error) {
					authCtx.login(responseData.userId, responseData.token);
					navigate("/dashboard");
				}
			} catch (err) {
				console.log(err.message);
				return;
			}
		} else {
			console.log("error");
		}
	};

	return (
		<>
			{error && <ErrorModal onClear={clearError} error={error} />}
			<div className={`container-fluid ${classes["card-container"]}`}>
				<Card className={classes.authentication}>
					{isLoading && <LoadingSpinner asOverlay />}

					<h2>Login Required</h2>
					<hr />
					<form
						className={classes["place-for"]}
						onSubmit={formSubmitHandler}
					>
						<Input
							id="user"
							element="input"
							type="text"
							label="Username:"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a valid user"
							onInput={inputHandler}
						/>
						<Input
							id="password"
							element="input"
							type="password"
							label="Password:"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a valid password"
							onInput={inputHandler}
						/>
						<Button type="submit" disabled={!formState.isFormValid}>
							LOGIN
						</Button>
					</form>
				</Card>
			</div>
		</>
	);
};

export default Auth;
