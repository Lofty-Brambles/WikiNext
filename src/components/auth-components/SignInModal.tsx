/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { CustomParameters } from "firebase/auth";
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
	useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { AlertCircle, GitHub, Mail } from "react-feather";
import { auth } from "../../firebase/firebase-init";
import store from "../../store";

// Error maps for user-friendly messages
const errorMapForEmail = new Map([
	[
		"auth/account-exists-with-different-credential",
		"This account already exists!",
	],
	["auth/credential-already-in-use", "This account is already in use!"],
	["auth/email-already-in-use", "This E-mail is in use, already!"],
]);

const SignInModal = () => {
	// States for the form values
	const [emailValue, setEmailValue] = useState<string>("");
	const [passValue, setPassValue] = useState<string>("");
	const [emailErr, setEmailErr] = useState<boolean>(false);
	const [displayErr, setDisplayErr] = useState<string>("");

	// The auth hooks
	const [createUserWemail, UserWemail, loadWemail, errWemail] =
		useSignInWithEmailAndPassword(auth);
	const [createUserWgmail, UserWgmail, loadWgmail, errWgmail] =
		useSignInWithGoogle(auth);
	const [createUserWgh, UserWgh, loadWgh, errWgh] = useSignInWithGithub(auth);

	// TODO: Effect hook to update the user credentials
	useEffect(() => {}, [UserWemail, UserWgmail, UserWgh]);

	// TODO: Effect hook, monitoring any errors that may creep up during the auth
	useEffect(() => {
		[errWemail, errWgmail, errWgh].forEach(ele => {
			if (ele !== undefined) {
				setDisplayErr(
					errorMapForEmail.get(ele.code) ??
						"An Unexpected Error was encountered!"
				);
				if (ele.code === "auth/email-already-in-use") {
					setEmailErr(true);
				} else {
					setEmailErr(false);
				}
			}
		});
	}, [errWemail, errWgmail, errWgh]);

	// The validation for button display
	const signInValidation = () => {
		const emailIsValid =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				emailValue
			);
		const passIsValid = /^.{8,}$/.test(passValue);

		return !(emailIsValid && passIsValid);
	};

	const looks = store(state => state.looks);

	return (
		<form
			className={`p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
				looks.darkMode ? "bg-slate-900" : "bg-slate-100"
			}`}
		>
			<div
				className={`flex justify-center items-center gap-3 font-titan text-4xl ${
					looks.darkMode ? "text-white" : ""
				}`}
			>
				<img src="/favicon.png" alt="icon" className="w-12" />
				Wiki
			</div>
			{displayErr !== "" && (
				<div className="w-full px-3 py-2 flex justify-start items-center gap-4 rounded border-2 border-red-700 font-serif text-red-700">
					<AlertCircle color="red" />
					<span className="flex-grow">{displayErr}</span>
				</div>
			)}
			<div
				className={`relative w-full ${
					looks.darkMode ? "text-white" : ""
				}`}
			>
				<input
					type="email"
					id="email"
					value={emailValue}
					onChange={e => {
						setEmailValue(e.currentTarget.value);
					}}
					className={`floater z-10 w-full px-3 py-2 border border-neutral-400 rounded outline-none bg-transparent focus:border-blue-700 font-sans ${
						emailErr === true ? "error-border" : ""
					}`}
				/>
				<label
					htmlFor="email"
					className={`absolute left-1 top-[9px] px-2 font-serif ${
						emailValue !== ""
							? "transition-transform ease-in-out scale-75 -translate-x-3 -translate-y-5 border-blue-700"
							: ""
					} ${emailErr === true ? "text-red-600" : ""} ${
						looks.darkMode ? "bg-slate-900" : " bg-slate-100"
					}`}
				>
					Email address...
				</label>
			</div>
			<div
				className={`relative w-full ${
					looks.darkMode ? "text-white" : ""
				}`}
			>
				<input
					type="password"
					id="password"
					value={passValue}
					onChange={e => {
						setPassValue(e.currentTarget.value);
					}}
					className="floater z-10 w-full px-3 py-2 border border-neutral-400 rounded outline-none bg-transparent focus:border-blue-700 font-sans"
				/>
				<label
					htmlFor="password"
					className={`absolute left-1 top-[9px] px-2 font-serif ${
						passValue !== ""
							? "transition-transform ease-in-out scale-75 -translate-x-3 -translate-y-5 border-blue-700"
							: ""
					} ${looks.darkMode ? "bg-slate-900" : " bg-slate-100"}`}
				>
					Password...
				</label>
				<p
					className={`${!signInValidation() && "hidden"} text-sm ${
						looks.darkMode ? "text-gray-400" : "text-gray-600"
					}`}
				>
					Passwords should have atleast 8 characters.
				</p>
			</div>
			<button
				type="button"
				className="w-full px-3 py-2 rounded bg-blue-700 disabled:bg-blue-300 text-white text-lg font-serif"
				disabled={signInValidation()}
				onClick={() => {
					createUserWemail(emailValue, passValue);
				}}
			>
				Log-in
			</button>
			<h6
				className={`font-mono relative before:absolute before:right-8 before:top-[calc(50%-1px)] before:w-[100px] before:h-px after:absolute after:left-8 after:top-[calc(50%-1px)] after:w-[100px] after:h-px ${
					looks.darkMode
						? "text-gray-400 before:bg-gray-400 after:bg-gray-400"
						: "text-gray-700 before:bg-gray-700 after:bg-gray-700"
				}`}
			>
				OR
			</h6>
			<button
				type="button"
				className="w-full px-3 py-2 rounded flex justify-center items-center gap-2 bg-red-600 text-white text-lg font-serif hover:bg-red-500"
				onClick={() => {
					createUserWgmail();
				}}
			>
				<Mail color="white" size={24} />
				Gmail
			</button>
			<button
				type="button"
				className={`w-full px-3 py-2 rounded flex justify-center items-center gap-2 text-white text-lg font-serif ${
					looks.darkMode
						? "bg-gray-500 hover:bg-gray-400"
						: "bg-gray-900 hover:bg-gray-800"
				}`}
				onClick={() => {
					createUserWgh();
				}}
			>
				<GitHub color="white" size={24} />
				Github
			</button>
		</form>
	);
};

export default SignInModal;
