import React, { useState } from "react";
import { GitHub, Mail } from "react-feather";
import { auth } from "../../firebase/firebase-init";
import useLoginMethods from "../../hooks-&-utils/useLoginMethod";
import store from "../../store";
import Buttons from "../input-components/Button";
import LoginInputs from "../input-components/LoginInput";
import AlreadyIn from "./AlreadyIn";
import AuthHeaders from "./AuthHeaders";
import LinkTxt from "./LinkTxt";

const SignIn = () => {
	// Form elements
	const [emailVal, setEmailVal] = useState<string>("");
	const [passVal, setPassVal] = useState<string>("");

	// Hook for log-in methods
	const [signInEmail, signInGmail, signInGh, loading, error] =
		useLoginMethods(auth);
	const [darkMode, user] = store(state => [
		state.userData.customise_darkMode,
		state.user,
	]);

	const signInValidation = () => {
		const emailIsValid =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				emailVal
			);
		const passIsValid = /^.{8,}$/.test(passVal);

		return !(emailIsValid && passIsValid);
	};

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{user !== undefined ? (
				<AlreadyIn />
			) : (
				<form
					className={`relative p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
						darkMode ? "bg-slate-900" : "bg-slate-100"
					}`}
				>
					<AuthHeaders error={error} loading={loading} />
					<LoginInputs
						name="Email Address"
						type="email"
						val={emailVal}
						setVal={setEmailVal}
						error={error?.code === "auth/email-already-in-use"}
					/>
					<LoginInputs
						name="Password"
						type="password"
						val={passVal}
						setVal={setPassVal}
						error={false}
					/>
					<Buttons
						name="Log-in"
						clickAction={() => {
							signInEmail(emailVal, passVal);
						}}
						disabled={signInValidation()}
						colors={{
							main: "bg-blue-700",
							disabled: "disabled:bg-blue-300",
							hover: "hover:bg-blue-600",
						}}
					/>
					<LinkTxt
						className="-mb-2"
						nonLinkTxt="Forgot your password?"
						linkTxt="Reset it!"
						to="/forgot-password"
					/>
					<h6
						className={`font-mono relative before:absolute before:right-8 before:top-[calc(50%-1px)] before:w-[100px] before:h-px after:absolute after:left-8 after:top-[calc(50%-1px)] after:w-[100px] after:h-px ${
							darkMode
								? "text-gray-400 before:bg-gray-400 after:bg-gray-400"
								: "text-gray-700 before:bg-gray-700 after:bg-gray-700"
						}`}
					>
						OR
					</h6>
					<LinkTxt
						className="-mt-3"
						nonLinkTxt="Don't have an account?"
						linkTxt="Sign up!"
						to="/sign-up"
					/>
					<Buttons
						name={
							<>
								<Mail color="white" size={24} /> Gmail
							</>
						}
						clickAction={() => {
							signInGmail();
						}}
						disabled={false}
						colors={{
							main: "bg-red-600",
							hover: "hover:bg-red-500",
						}}
					/>
					<Buttons
						name={
							<>
								<GitHub color="white" size={24} /> Github
							</>
						}
						clickAction={() => {
							signInGh();
						}}
						disabled={false}
						colors={{
							main: darkMode ? "bg-gray-500" : "bg-gray-900",
							hover: darkMode
								? "hover:bg-gray-400"
								: "hover:bg-gray-800",
						}}
					/>
				</form>
			)}
		</>
	);
};

export default SignIn;
