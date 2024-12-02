import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const activeHttpRequests = useRef([]);
	const sendRequest = useCallback(
		async (url, method = "GET", headers = {}, body = null) => {
			try {
				setIsLoading(true);
				const httpAbortCtrl = new AbortController();
				activeHttpRequests.current.push(httpAbortCtrl);
				const response = await fetch(url, {
					method,
					headers,
					body,
					signal: httpAbortCtrl.signal,
				});

				const responseData = await response.json();

				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);
				if (!response.ok) {
					throw new Error(responseData.message);
				}
				setIsLoading(false);
				return responseData;
			} catch (e) {
				setError(e.message);
				setIsLoading(false);
				console.log(e.message);
				throw e;
			}
		},
		[]
	);

	const clearError = () => {
		setError((prevState) => null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) =>
				abortCtrl.abort()
			);
		};
	}, []);
	return { isLoading, error, sendRequest, clearError };
};
