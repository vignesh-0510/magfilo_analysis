import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import classes from "./ImageUpload.module.css";
const ImageUpload = (props) => {
	const filePickerRef = useRef();
	const [file, setFile] = useState();
	const [previewURL, setPreviewURL] = useState();
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewURL(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);
	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = false;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}

		props.onInput(props.id, pickedFile, fileIsValid);
	};
	return (
		<div className={`${classes["form-control"]} `}>
			<input
				type="file"
				id={props.id}
				ref={filePickerRef}
				style={{ display: "none" }}
				accept=".jpg,.png,.jpeg"
				onChange={pickedHandler}
			/>
			<div
				className={`${classes["image-upload"]} ${
					props.center && classes["center"]
				}`}
			>
				<div
					className={`${classes["image-upload__preview"]} ${
						props.center && classes["center"]
					}`}
				>
					{previewURL && <img src={previewURL} alt="Preview" />}
					{!previewURL && <p> Please upload an image</p>}
				</div>
				<Button type="button" onClick={pickImageHandler}>
					Pick Me
				</Button>
			</div>
			{!isValid && <p>{props.errorText}</p>}
		</div>
	);
};

export default ImageUpload;
